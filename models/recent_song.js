const mongoose = require("mongoose");
const {Schema} = mongoose;

const recentSongSchema = new Schema(
    {
        songName : {
            type : String,
            required:true,
            lowercase:true,
            trim:true
        },

        songImageUrl : {
            type: String,
            required:true,
            trim:true
        },

        singerImageUrl : {
            type: String,
            required:true,
            trim:true
        },

        songMP3 : {
            type: String,
            required:true,
            trim:true
        },

        singerName : {
            type:String,
            required:true
        },

        album:{
            type:String
        },

        movie:{
            type:String
        },

        playedAt: {
            type: Date,
            default: Date.now // Sets the default value to the current date and time
        },
        like:{
            type:Boolean,
            default:false
        }
    }
)


const RecentSong = mongoose.model("RecentSong" , recentSongSchema)

module.exports = RecentSong;