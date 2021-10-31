const News = require("../db/models/news.model")

getFollowedNews = async(type, followed, cb)=>{
    let news = []
    if(followed.length != 0){
        let artical = []
        let proccessed = 0
        followed.forEach( async(el, i)=>{
            
            if (type == 'player'){
                articals = await News.find( { 'aboutPlayers.id': el.id } )
            } else if (type == 'team'){
                articals = await News.find( { 'aboutTeams.id': el.id } )
            }else if (type == 'competition'){
                articals = await News.find( { 'aboutCompetitions.id': el.id } )
            } else{
                cb(null)
            }

            proccessed++
            if(!artical){
                return true

            }
            news.push(articals)

            
            if(proccessed == followed.length){
                cb(news)
            }
            
        })
    }
    else {
        cb(null)
    }
}

class NewsController {

    static showAboutPlayer = async(req, res)=>{
        try{
            let news = await News.find({'aboutPlayers.id':req.params.id})
            res.send({apiStatus:true, message:"news about one player", data:news})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in getting news about one player"
            })
        }
    }

    static showAboutTeam = async(req, res)=>{
        try{
            let news = await News.find({"aboutTeams.id": req.params.id})
            res.send({apiStatus:true, message:"news about one team", data:news})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in getting news about one team"
            })
        }
    }

    static showAboutCompetition = async(req, res)=>{
        try{
            let news = await News.find({"aboutCompetitions.id": req.params.id})
            res.send({apiStatus:true, message:"news about one competition", data:news})
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message:"error in getting news about one competiton"
            })
        }
    }

    static showForUserPlayers = async(req, res)=>{
        let user = req.user
        let followedPlayers = user.followedPlayers

        getFollowedNews('player', followedPlayers, function(news){
            res.send({apiStatus:true, message:"all followed players news", data:news})
        })
    }

    static showForUserTeams = async(req, res)=>{
        let user = req.user
        let followedTeams = user.followedTeams

        getFollowedNews('team', followedTeams, function(news){
            if(news == null) res.send({apiStatus:true, message:'no followed teams', data:[]})
            res.send({apiStatus:true, message:"all followed teams news", data:news})
        })
    }

    static showForUserCompetitions = async(req, res)=>{
        let user = req.user
        let followedCompetitions = user.followedCompetitions

        getFollowedNews('competition', followedCompetitions, function(news){
            if(news == null) res.send({apiStatus:true, message:'no followed competitions', data:[]})
            res.send({apiStatus:true, message:"all followed competitions news", data:news})
        })
    }
}

module.exports = NewsController