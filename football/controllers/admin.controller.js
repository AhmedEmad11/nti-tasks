const User = require("../db/models/user.model")
const Role = require("../db/models/role.model")
const Permission = require("../db/models/permission.model")
const Competition = require("../db/models/competition.model")
const Team = require("../db/models/team.model")
const Player = require("../db/models/player.model")
const News = require("../db/models/news.model")

const http =require("http")

class AdminController {

    static addPermission = async(req, res)=>{
        try{
            let perm = new Permission(req.body)
            await perm.save()
            res.send(perm)
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding permission"
            })
        }
    }
    
    static addRole = async(req, res)=>{
        try{
            let role = new Role(req.body)
            await role.save()
            res.send(role)
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding role"
            })
        }
    }
    
    static addRoleToUser = async(req, res)=>{
        try{
            let user = await User.findOne({eamil:req.body.email})
            let role = await Role.findOne({_id:req.body.role})
            user.roles.push(role)
            await user.save()
            res.send(user)
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding role to user"
            })
        }
        
    }
    
    static addPermissionToRole = async(req, res)=>{
        try{
            let role = await Role.findOne({name:req.body.role})
            let perm = await Permission.findOne({name:req.body.permission})
            role.permissions.push(perm)
            await role.save()
            res.send(role)
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding permission to role"
            })
        }
    }

    static showPermissions = async(req, res)=>{
        try{
            let perms = await Permission.find()
            res.send({apiStatus:true, message:"all permissions", data:perms})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all permissions"
            })
        }
    }

    static showRoles = async(req, res)=>{
        try{
            let roles = await Role.find()
            res.send({apiStatus:true, message:"all roles", data:roles})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all roles"
            })
        }
    }

    static addOrUpdateCompetition = async(req, res)=>{
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
                            competition = new Competition({...data})
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
                            let team = new Team({compId: data.competition.id, ...el})
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

    static deleteCompetition = async(req, res)=>{
        try{
            let deletedComp = await Competition.deleteOne({id: req.params.id})
            if(deletedComp){
                res.status(200).send({apiStatus:true, message:"competition deleted", data: deletedComp})
            }
        }
        catch(e){
                res.status(500).send({
                    apiStatus: false,
                    data: e.message,
                    message:"error in deleting competition"
                })
            
        }
    }

    static addNews = async(req, res)=>{
        try{
            let news = new News(req.body)
            await news.save()
            res.send({apiStatus:true, message:"added", data: news})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding news"
            })
        }
    }

    static deleteNews = async(req, res)=>{
        try{
            await News.deleteOne({_id: req.params.id})
            res.send({apiStatus:true, message:"news deleted", data:[]})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in deleting news"
            })
        }
    }

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
                if(response.statusCode == 200){
                    response.on('data', (dataPart)=>{
                        result += dataPart.toString()
                    })
                    
                    response.on('end', async()=>{

                        let data = JSON.parse(result)
                        let team = await Team.findOne({id: req.params.id})
                        if(!team){
                            throw new Error('team not found')
                        }
                        
                        team.squad = data.squad
                        await team.save()

                        data.squad.forEach( async(el)=>{   
                          
                            let player = await Player.findOne({id: el.id})
                            if(!player){
                                player = new Player({...el})
                                player.teamId.push(data.id)
                                await player.save()
                            } 
                        })
                        
                    })
                } else if(response.statusCode == 429) {
                    res.status(500).send({
                        apiStatus: false,
                        message:"api request limit reached"
                    })                    
                } else {
                    throw new Error('error getting data')
                }
            })
            request.end()
            res.status(200).send({apiStatus:true, message:"success"})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding team squad"
            })
        }
    }

    static deleteTeam = async(req, res)=>{
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
}

module.exports = AdminController