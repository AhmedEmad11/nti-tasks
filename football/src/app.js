require('dotenv').config()
require('../db/connection')

const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const competitionRoutes = require('../routes/competition.router')
const teamRoutes = require('../routes/team.router')
const userRoutes = require('../routes/user.router')
const newsRoutes = require('../routes/news.router')

app.use('/competition',competitionRoutes)
app.use('/team',teamRoutes)
app.use('/user',userRoutes)
app.use('/news',newsRoutes)
 

module.exports = app