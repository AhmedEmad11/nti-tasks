const http =require("http")

const Team = require("../db/models/team.model")
const Player = require("../db/models/player.model")

class TeamController {

    static addOrUpdateTeamSquad = async(req, res)=>{
        try{
            let options = {
                host : "api.football-data.org",
                path: `/v2/teams/${req.params.id}`,
                method : "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-Auth-Token': `${process.env.APIKEY}`
                }
            }
            
            const request = http.request(options, (response)=>{
                let result = "" 
                if(response.statusCode == 200)
                {
                    response.on('data', (dataPart)=>{
                        result += dataPart.toString()
                    })
                    
                    response.on('end', async()=>{
                        
                        let data = JSON.parse(result)
                        let message = ""
                        let team = await Team.findOne({id: req.params.id})
                        if(!team){
                            throw new Error('team not found')
                        }
                        
                        team.squad = data.squad
                        await team.save()

                        data.squad.forEach( async(el)=>{   
                          
                            let player = new Player({
                                // id         : el.id,
                                // name       : el.name,
                                // position   : el.position,
                                // nationality: el.nationality,
                                // shirtNumber: el.shirtNumber,
                                ...el
                            })
                            player.teamId.push(data.id)
                            await player.save(function(err, doc) {
                                if (err) console.log(err);
                            })
                        })
                        message = "team players added"
                        let addPlayers = await Player.find({team : data.id})
                        res.send({apiStatus:true, message, data: addPlayers})
                    })
                } else {
                    throw new Error("error getting data")
                }
            })
            request.end()
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding team"
            })
        }
    }

    static delete = async(req, res)=>{
        try{
            await Team.deleteOne({id: req.params.id})
            res.send({apiStatus:true, message:"team deleted", data:[]})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in deleting team"
            })
        }
    }

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