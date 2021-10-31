const User = require("../db/models/user.model")
const Role = require("../db/models/role.model")

class UserController {
    
    static register = async(req, res)=>{
        try{
            let user = new User(req.body)
            let role = await Role.findOne({name:"user"})
            user.roles.push(role)
            await user.save()
            res.send({apiStatus:true, message:"registered", data: user})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in adding user"
            })
        }
    }

    static login = async(req,res)=>{
        try{
            const  loginData = await User.loginUser(req.body.email, req.body.password)
            const user = loginData['user']
            const isAdmin = loginData['isAdmin']
            const token = await user.generateToken()

            res.status(200).send({apiStatus:true, data:{user, token, isAdmin}, message:"logged in success"})
        }
        catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"invalid login"})
        }
    }

    static profile = async(req,res)=>{
        res.status(200).send({
            apiStatus:true,
            data:req.user,
            isAdmin:req.isAdmin,
            message:"user data loaded"
        })
    }

    static logoutAll = async(req, res)=>{
        try{
            req.user.tokens=[]
            await req.user.save()
            res.send({
                apiStatus:true,
                data:"",
                message:"user logged out"
            })
        }
        catch(e){
            res.send(e)
        }
    }

    static logout = async(req, res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(token=> token.token != req.token)
            req.user.save()
            res.status(200).send({
                apiStatus:true,
                data:req.user.tokens,
                message:"user logged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in logging user out"
            })
        }
    }

    static delete = async(req, res)=>{
        try{
            await User.deleteOne({_id: req.params.id})
            res.send({apiStatus:true, message:"user deleted", data:[]})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in deleting user"
            })
        }
    }

    static followPlayer = async(req, res)=>{
        try{
            let user = req.user
            user.followedPlayers.push(req.body)
            await user.save()
            res.send({apiStatus:true, message:"all followed players", data:user.followedPlayers})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in following player"
            })
        }
    }

    static unFollowPlayer = async(req, res)=>{
        try{
            let user = req.user
            req.user.followedPlayers = req.user.followedPlayers.filter(player=> player.id != req.body.id)
            await user.save()
            res.send({apiStatus:true, message:"all followed players", data:user.followedPlayers})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in unfollowing player"
            })
        }
    }

    static followTeam = async(req, res)=>{
        try{
            let user = req.user
            user.followedTeams.push(req.body)
            await user.save()
            res.send({apiStatus:true, message:"all followed teams", data:user.followedTeams})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in following team"
            })
        }
    }

    static unFollowTeam = async(req, res)=>{
        try{
            let user = req.user
            req.user.followedTeams = req.user.followedTeams.filter(team=> team.id != req.body.id)
            await user.save()
            res.send({apiStatus:true, message:"all followed teams", data:user.followedTeams})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in unfollowing team"
            })
        }
    }

    static followCompetition = async(req, res)=>{
        try{
            let user = req.user
            user.followedCompetitions.push(req.body)
            await user.save()
            res.send({apiStatus:true, message:"all followed competition", data:user.followedCompetitions})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in following competiton"
            })
        }
    }

    static unFollowCompetition = async(req, res)=>{
        try{
            let user = req.user
            req.user.followedCompetitions = req.user.followedCompetitions.filter(comp=> comp.id != req.body.id)
            await user.save()
            res.send({apiStatus:true, message:"all followed competitions", data:user.followedCompetitions})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in unfollowing competition"
            })
        }
    }

    static showPlayers = async(req, res)=>{
        try{
            let user = req.user
            let followedPlayers = user.followedPlayers 
            res.send({apiStatus:true, message:"all followed players", data:followedPlayers})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all followed players"
            })
        }
    }

    static showTeams = async(req, res)=>{
        try{
            let user = req.user
            let followedTeams = user.followedTeams 
            res.send({apiStatus:true, message:"all followed teams", data:followedTeams})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all followed teams"
            })
        }
    }

    static showCompetitions = async(req, res)=>{
        try{
            let user = req.user
            let followedCompetitions = user.followedCompetitions 
            res.send({apiStatus:true, message:"all followed competitions", data:followedCompetitions})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in showing all followed competitions"
            })
        }
    }
}

module.exports = UserController