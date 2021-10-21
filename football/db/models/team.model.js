const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    compId:{
        type: String,
        ref:"Competition",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    tla:{
        type:String,
        required:true
    },
    crestUrl:{
        type:String,
        require:true
    },
    founded:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    squad:[],
},
    {timestamps:true}
)

const Team = mongoose.model("Team", teamSchema)
module.exports = Team