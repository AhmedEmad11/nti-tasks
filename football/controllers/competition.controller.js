const Competition = require("../db/models/competition.model")

class CompetitionController {

    static showAll = async(req, res)=>{
        try{
            let allComps = await Competition.find()
            res.send({apiStatus:true, message:"all competitions", data:allComps})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all competitions"
            })
        }
    }

    static showOne = async(req, res)=>{
        try{
            let comp = await Competition.findOne({id: req.params.id})
            res.send({apiStatus:true, message:"one competition", data:comp})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing one competition"
            })
        }
    }
}

module.exports = CompetitionController