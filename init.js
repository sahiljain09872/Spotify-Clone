const mongoose = require("mongoose")
const Song = require("./models/song.js");
const RecentSong = require("./models/recent_song.js");
const Library = require("./models/library.js")

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main().then(res => console.log("connection successful"))
.catch(err => console.log(err))


// after creating the connection you have to insert some songs into the collections
Song.insertMany(
    [
        {
          songName: "king of indian hip hop",
          songImageUrl: "./assets/king_of_indian_hip_hop.jpeg",
          singerImageUrl: "./assets/emiway.jpeg",
          songMP3: "./songs/king_of_indian_hip_hop.mp3",
          singerName: "Emiway",
        },
        {
          songName: "desi kalakaar",
          songImageUrl: "./assets/desi_kalakaar.jpeg",
          singerImageUrl: "./assets/honeySinghLatest.jpeg",
          songMP3: "./songs/desi_kalakaar.mp3",
          singerName: "Yo Yo Honey Singh"
        },
        {
          songName: "get up jawani",
          songImageUrl: "./assets/get_up_jawani.jpeg",
          singerImageUrl: "./assets/honeySinghLatest.jpeg",
          songMP3: "./songs/get_up_jawani.mp3",
          singerName: "Yo Yo , Badshah"
        },
        {
          songName: "hola amigo",
          songImageUrl: "./assets/hola_amigo.jpeg",
          singerImageUrl: "./assets/seedheMaut.jpeg",
          songMP3: "./songs/hola_amigo.mp3",
          singerName: "Seedhe Maut , KR$NA"
        },
        {
          songName: "woh raat",
          songImageUrl: "./assets/woh_raat.jpeg",
          singerImageUrl: "./assets/raftaar.jpeg",
          songMP3: "./songs/woh_raat.mp3",
          singerName: "Raftaar , KR$NA"
        },
        {
          
          songName:"hauli hauli",
          songImageUrl:"./assets/Hauli_Hauli.jpeg",
          singerImageUrl:"./assets/honeySinghlatest.jpeg",
          songMP3:"./songs/Hauli_Hauli.mp3",
          singerName:"Honey Singh"
        },
        {
          songName: "khatta flow",
          songImageUrl: "./assets/khatta_flow.jpeg",
          singerImageUrl: "./assets/seedheMaut.jpeg",
          songMP3: "./songs/khatta_flow.mp3",
          singerName: "Seedhe Maut",
        },
        {
          songName: "gyan",
          songImageUrl: "./assets/gyan.jpeg",
          singerImageUrl: "./assets/badshah.jpeg",
          songMP3: "./songs/gyan.mp3",
          singerName: "Badshah",
        }
        
      ]
)


// Library.insertMany(
//   [
//     {
//       imageSrc:"data:image/png;base64,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",
//       title:"Liked Songs",
//       subTitle:"Playlist 25 songs",
//     },
//     {
//       imageSrc:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3875b7bb-cf69-4120-b8d2-cc5c7b1d43b7/dcnveh7-e3f14fc1-013f-4832-b1cc-41f1d6da27c2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM4NzViN2JiLWNmNjktNDEyMC1iOGQyLWNjNWM3YjFkNDNiN1wvZGNudmVoNy1lM2YxNGZjMS0wMTNmLTQ4MzItYjFjYy00MWYxZDZkYTI3YzIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.AZqIl8FWnbzJ7LWaWM154GQlns-NrHkvEpy83W6SBQU",
//       title:"Your Episodes",
//       subTitle:"saved and downloaded episodes",
//     },
//     {
//       imageSrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpqT_XmneIyM83CZBYSQ-QYtphF3x8xZLMfw&s",
//       title:"Sahil Jain",
//       subTitle:"Artist",
//     },
//     {
//       imageSrc:"./assets/ar_rahman.jpeg",
//       title:"AR Rahman",
//       subTitle:"Artist",
//     },
//     {
//       imageSrc:"./assets/emiway.jpeg",
//       title:"Emiway Bantai",
//       subTitle:"Artist",
//     },
//   ]
// )