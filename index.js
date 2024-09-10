const { name } = require("ejs");
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose");
const {Schema} = mongoose;
const Song = require("./models/song.js");
const RecentSong = require("./models/recent_song.js");
const Library = require("./models/library.js");




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
    const recentSongs = await RecentSong.find({}).sort({ playedAt: -1 }).limit(5);
    res.render("project.ejs" , {name : "home-content" , recentSongs : recentSongs , libraries:libraries});
})

app.get("/search" ,async (req ,res)=>{
    const data = {
        name : "search-content"
    }
    const libraries = await Library.find({});

    const recentSongs = await RecentSong.find({}).sort({ playedAt: -1 }).limit(5);

    res.render("project.ejs" , {name : "search-content" , songs:[] , recentSongs:recentSongs , libraries:libraries})
})

// app.get("/library/:title" ,async (req ,res)=>{
//     const data = {
//         name : "library"
//     }
//     const {title} = req.params;
//     console.log(title);
//     const libraries = await Library.find({});

//     res.render("project.ejs" , {name : "library" , libraries:libraries})
// })

app.get("/searchSong" , async (req , res) =>{
    const {song : songName} = req.query;

    const songs = await Song.find({songName : `${songName.toLowerCase().trim()}`})
    console.log(songs);
    const recentSongs = await RecentSong.find({}).sort({ playedAt: -1 }).limit(5);
    const libraries = await Library.find({});

    // console.log(songs);

    res.render("project.ejs" , {name : "search-content" , songs:songs , recentSongs:recentSongs , libraries:libraries});
    
})

app.get("/api/song/:id", async (req, res) => {
    const { id } = req.params;
    const song = await Song.findById(id);
    // console.log(song);

    

    if (song) {
        // first findAndDelete the song if present in the db
        await RecentSong.findByIdAndDelete(song._id);
        await RecentSong.create({
            _id:song._id,
            songName: song.songName,
            songImageUrl: song.songImageUrl,
            singerImageUrl: song.singerImageUrl,
            songMP3: song.songMP3,
            singerName: song.singerName,
            album: song.album,
            movie: song.movie,
            like:song.like,
        });
        res.json(song); // Send the song data as JSON
    } else {
        res.status(404).send("Song not found");
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

app.get("/api/library/:title", async (req, res) => {
    try {
        const { title } = req.params; // Extract the title from the URL
        console.log("API request for title:", title);
        
        const libraries = await Library.find({});
        
        // res.render("project.ejs" , {name : "library" , libraries:libraries})
        res.render("project.ejs", { name: "library", libraries });
    } catch (error) {
        console.error("Error while fetching the library:", error);
        res.status(500).send("An error occurred");
    }
});

  

app.get("/yourlibrary" , async (req , res)=>{
    const libraries = await Library.find({});

    res.render("project.ejs" , {name : "your_library" , libraries:libraries});
})


