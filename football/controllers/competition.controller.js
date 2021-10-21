const http =require("http")

const Competition = require("../db/models/competition.model")
const Team = require("../db/models/team.model")

class CompetitionController {

    static addOrUpdate = async(req, res)=>{
        try{
            let options = {
                host : "api.football-data.org",
                path: `/v2/competitions/${req.params.id}`,
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
                        let competition = await Competition.findOne({id: data.id})
                        if (!competition){
                            competition = new Competition({
                                // id: data.id, 
                                // name: data.name, 
                                // currentSeason: data.currentSeason
                                ...data
                            })
                            message = "competition added"
                        } else {
                            competition.currentSeason = data.currentSeason
                            message = "competition updated"
                        }
                        await competition.save()
                        res.send({apiStatus:true, message, data: competition})
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
                message:"error in adding competition"
            })
        }
    }

    static addOrUpdateTeams = async(req, res)=>{
        try{
            let options = {
                host : "api.football-data.org",
                path: `/v2/competitions/${req.params.id}/teams`,
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
                        let oldTeam = await Team.findOne({compId: req.params.id})
                        if(oldTeam){
                            await Team.deleteMany({compId: req.params.id})
                        }
                        data.teams.forEach( async(el)=>{   
                            let team = new Team({
                                // id: el.id, 
                                // name: el.name, 
                                compId: data.competition.id,
                                ...el
                                // tla: el.tla,
                                // crestUrl: el.crestUrl,
                                // founded: el.founded,
                                // venue: el.venue
                            })
                            await team.save()
                        })
                        message = "competition teams added"
                        
                        let compTeams = await Team.find({compId: req.params.id})
                        res.send({apiStatus:true, message, data: compTeams})
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
                message:"error in adding competition teams"
            })
        }
    }

    static delete = async(req, res)=>{
        try{
            await Competition.deleteOne({id: req.params.id})
            res.send({apiStatus:true, message:"competition deleted", data:[]})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in deleting competition"
            })
        }
    }

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