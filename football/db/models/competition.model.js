const mongoose = require("mongoose")

const competitionSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    currentSeason:{}
},
    {timestamps:true}
)

const Competition = mongoose.model("Competition", competitionSchema)
module.exports = Competition