const Player = require("../db/models/player.model")

class PlayerController {

    static showAll = async(req, res)=>{
        try{
            let allPlayers = await Player.find()
            res.send({apiStatus:true, message:"all Players", data:allPlayers})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all players"
            })
        }
    }

    static showOne = async(req, res)=>{
    
        try{
            let player = await Player.findOne({id: req.params.id})
            res.send({apiStatus:true, message:"one Player", data:player})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing one Player"
            })
        }
    }
}

module.exports = PlayerController