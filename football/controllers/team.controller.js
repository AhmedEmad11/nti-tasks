const Team = require("../db/models/team.model")

class TeamController {

    static showAll = async(req, res)=>{
        try{
            let allTeams = await Team.find()
            res.send({apiStatus:true, message:"all teams", data:allTeams})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all tems"
            })
        }
    }

    static showOne = async(req, res)=>{
        try{
            let team = await Team.findOne({id: req.params.id})
            res.send({apiStatus:true, message:"one team", data:team})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing one team"
            })
        }
    }
}

module.exports = TeamController