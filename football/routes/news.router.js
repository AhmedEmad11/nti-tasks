const router = require('express').Router()
const NewsController = require("../controllers/news.controller")

const auth = require('../middleware/auth.middleware')

router.get('/player/:id', auth('showPlayerNews'), NewsController.showAboutPlayer)
router.get('/team/:id', auth('showTeamNews'), NewsController.showAboutTeam)
router.get('/competiton/:id', auth('showCompetitionNews'), NewsController.showAboutCompetition)

module.exports = router