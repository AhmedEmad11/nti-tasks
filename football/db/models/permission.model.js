const mongoose = require("mongoose")

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    }
})

const Permission = mongoose.model("Permission", PermissionSchema)
module.exports = Permission