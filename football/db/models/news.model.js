const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true,
        trim:true
    },
    aboutPlayers:[{
        id:{
            type: String,
            ref:"Player"
        }
    }],
    aboutTeams:[{
        id:{
            type: String,
            ref:"Team"
        },
    }],
    aboutCompetitions:[{
        id:{
            type: String,
            ref:"Competition"
        }
    }],
},
    {timestamps:true}
)

const News = mongoose.model("News", newsSchema)
module.exports = News