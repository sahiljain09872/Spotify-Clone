const { name } = require("ejs");
const express = require("express")
const app = express()
const path = require("path")

const port = 3000;

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname , "/public/css")));
app.use(express.static(path.join(__dirname , "/public/js")));
app.use("/assets"  , express.static(path.join(__dirname , "/assets")));
app.use("/songs"  , express.static(path.join(__dirname , "/songs")));



app.listen( port , () =>{
    console.log(`Server is listening to the port : ${port}`)
})

app.get(["/" , "/home" , "/index"] , (req ,res) => {
    const data = {
        name : "home-content"
    }
    res.render("project.ejs" , {data : data})
})

app.get("/search" , (req ,res)=>{
    const data = {
        name : "search-content"
    }

    res.render("project.ejs" , {data : data})
})

app.get("/yourlibrary" , (req , res)=>{
    const data = {
        name : "your_library"
    }

    res.render("project.ejs" , {data : data})
})