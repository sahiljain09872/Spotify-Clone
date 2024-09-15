const { name } = require("ejs");
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose");
const {Schema} = mongoose;
const Song = require("./models/song.js");
const RecentSong = require("./models/recent_song.js");
const Library = require("./models/library.js");


async function recentSongs_func(){
    const recentSongsRef = await RecentSong.find({}).sort({ playedAt: -1 }).limit(5);
    // this will return array of recentSongsRef

    let recentSongs = []

    for(ref of recentSongsRef){
        // now get the id of the recentSong
        let song_id = ref.song;
        let song =await Song.findById(song_id);
        recentSongs.push(song);
    }

    return recentSongs;
}


const port = 8080;

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname , "/public")));

app.use("/assets"  , express.static(path.join(__dirname , "/assets")));
app.use("/songs"  , express.static(path.join(__dirname , "/songs")));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main().then(res => console.log("connection successful"))
.catch(err => console.log(err))

app.listen( port , () =>{
    console.log(`Server is listening to the port : ${port}`)
})

app.get(["/" , "/home" , "/index"] ,async (req ,res) => {
    const libraries = await Library.find({});

    const recentSongs = await recentSongs_func();

    const mostViewedSongs = await Song.find({}).sort({views:-1}).limit(10);

    res.render("project.ejs" , {name : "home-content" , recentSongs : recentSongs , libraries:libraries , mostViewedSongs:mostViewedSongs});
})

app.get("/search" ,async (req ,res)=>{

    const libraries = await Library.find({});

    const recentSongs = await recentSongs_func();

    res.render("project.ejs" , {name : "search-content" , songs:[] , recentSongs:recentSongs , libraries:libraries})
})

app.get("/searchSong" , async (req , res) =>{
    const {song : songName} = req.query;

    const songs = await Song.find({songName : `${songName.toLowerCase().trim()}`})

    const recentSongs = await recentSongs_func();
 
    const libraries = await Library.find({});

    res.render("project.ejs" , {name : "search-content" , songs:songs , recentSongs:recentSongs , libraries:libraries});
})

app.get("/api/song/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Song.findByIdAndUpdate(`${id}` , { $inc: { views: 1 } })
    
        const existingRecentSong = await RecentSong.findOne({ song:id});
        
        if (existingRecentSong) {
            // If a RecentSong already exists, return it
            await RecentSong.deleteMany({song:id});
        }
        
        // Create a new RecentSong document
        const recentSong = new RecentSong({
            song: id // Reference to the found song
        });
        
        // Save the RecentSong document
        await recentSong.save();
        
        // Respond with the newly created RecentSong
        res.status(201).json(recentSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



app.get("/api/likeSong/:id", async (req, res) => {
    const { id } = req.params;
    const song = await Song.findById(id);
    // console.log(song);

    try{
        const newLikeStatus = song.like === false ? true : false;

        await Song.findByIdAndUpdate(id , {like : newLikeStatus});
        await RecentSong.findByIdAndUpdate(id , {like : newLikeStatus});

        console.log("like song api reqest recieved")
        res.status(200).send("liked the song");
    }catch(error){
        console.log("error while handling the like")
        res.status(500).send("error in like ");
    }
});

app.get("/showLikedSongs" , async (req , res)=>{
    console.log("show liked songs")
    const likedSongs = await Song.find({like : true});
    const libraries = await Library.find({});

    res.render("project.ejs" , {name : "showLikeSongs" , libraries , likedSongs});
})


app.get("/library/:title", async (req, res) => {
    try{
        const {title} = req.params;
        console.log("show library : " , title);
        const libraries = await Library.find({});
        const curr_library = Library.findOne({title : title})

        res.render("project.ejs" ,{name:"library" , libraries});
         
    } catch(error){
        console.log("error is coming for show library")
        res.status(400).send("internal server problem")
    }
});

app.get("/artist_library/:singer" ,async (req , res)=>{
    let {singer} = req.params;
    console.log(singer)
    const recentSongs = await recentSongs_func();
    const libraries = await Library.find({});
    res.render("project.ejs" , {name:"library" , libraries})
})

  

app.get("/yourlibrary" , async (req , res)=>{

    const libraries = await Library.find({});

    res.render("project.ejs" , {name : "your_library" , libraries:libraries});
})


