const mongoose = require("mongoose");
const {Schema} = mongoose;

const songSchema = new Schema(
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

        like:{
            type:Boolean,
            default:false
        }
    }
)


const Song = mongoose.model("Song" , songSchema)

module.exports = Song;