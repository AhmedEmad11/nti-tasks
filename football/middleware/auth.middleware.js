const jwt = require("jsonwebtoken")
const User = require("../db/models/user.model")
function auth(action){
    return async(req, res, next) =>{
        try{
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
            
            if(prems.roles != []) {
                prems.roles.forEach( role=>{
                    role.permissions.forEach( permission => {
                        if (permission.name == action){
                            req.user = user
                            req.token = token
                            next()
                        }
                    })    
                } )
            }  else throw new Error("unauthorized")
            
        }
        catch(e){ res.status(500).send({apiStatus:false, data: e, message:"unauthorized"})}
    }
}
module.exports = auth