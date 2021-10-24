const User = require("../db/models/user.model")

class UserController {

    static addPermission = async(req, res)=>{
        let perm = new Permission(req.body)
        await perm.save()
        res.send(perm)
    }
    
    static addRole = async(req, res)=>{
        let role = new Role(req.body)
        await role.save()
        res.send(role)
    }
    
    static addRoleToUser = async(req, res)=>{
        let user = await User.findOne({eamil:req.body.email})
        let role = await Role.findOne({_id:req.body.role})
        user.roles.push(role)
        await user.save()
        res.send(user)
    }
    
    static register = async(req, res)=>{
        try{
            let user = new User(req.body)
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
            const userData = await User.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            res.status(200).send({apiStatus:true, data:{userData, token}, message:"logged in success"})
        }
        catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"invalid login"})
        }
    }

    static profile = async(req,res)=>{
        res.status(200).send({
            apiStatus:true,
            data:req.user,
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
            console.log(e)
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in following player"
            })
        }
    }

    static followTeam = async(req, res)=>{
        try{
            let user = req.user
            user.followedTeams.push(req.body)
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

    static followCompetition = async(req, res)=>{
        try{
            let user = req.user
            user.followedCompetition.push(req.body)
            res.send({apiStatus:true, message:"all followed competition", data:user.followedCompetition})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in following competiton"
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
            res.send({apiStatus:true, message:"all followed players", data:followedTeams})
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
            let followedCompetitions = user.followedcomperitions 
            res.send({apiStatus:true, message:"all followed players", data:followedcomperitions})
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