const jwt = require("jsonwebtoken")
const User = require("../db/models/user.model")
function auth(action){
    return async(req, res, next) =>{
        try{
            let flag = true
            const token = req.header("Authorization").replace("Bearer ", "")
            const decoded = jwt.verify(token, process.env.JWTTOKEN);
            const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
            if(!user) throw new Error('user not found')
        
            let prems = await user.populate({
                    path: 'roles',
                    populate: [{
                    path: 'permissions',
                    model: 'Permission'
                }]
            })

            let isAdmin = false
            if(prems.roles != []) {
                prems.roles.forEach( role=>{
                    if(role.name == "admin"){
                        isAdmin = true
                    } 
                } )
            }
            req.isAdmin = isAdmin
            
            if(prems.roles != []) {
                prems.roles.forEach( role=>{
                    role.permissions.forEach( permission => {
                        if (permission.name == action){
                            flag=false
                            req.user = user
                            req.token = token
                        }
                    })    
                } )
            }  
            if(flag) throw new Error("unauthorized")
            next()
            
        }
        catch(e){ res.status(500).send({apiStatus:false, data: e, message:"unauthorized"})}
    }
}
module.exports = auth