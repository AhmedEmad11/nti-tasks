require('dotenv').config()
require('../db/connection')

const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const competitionRoutes = require('../routes/competition.router')
const teamRoutes = require('../routes/team.router')
const userRoutes = require('../routes/user.router')
const newsRoutes = require('../routes/news.router')
const adminRoutes = require('../routes/admin.router')
const playerRoutes = require('../routes/player.router')

app.use('/competition',competitionRoutes)
app.use('/team',teamRoutes)
app.use('/user',userRoutes)
app.use('/news',newsRoutes)
app.use('/admin',adminRoutes)
app.use('/player',playerRoutes)

module.exports = app