const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    shirtNumber:{
        type:Number,
        default:null
    },
    teamId:[{
        type: String,
        ref:"Team"
    }],
},
    {timestamps:true}
)

const Player = mongoose.model("Player", playerSchema)
module.exports = Player