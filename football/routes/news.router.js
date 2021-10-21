const router = require('express').Router()
const NewsController = require("../controllers/news.controller")
const auth = require('../middleware/auth.middleware')

router.post('/add', auth('addNews'), NewsController.add)

router.get('/player/:id', auth('showPlayerNews'), NewsController.showAboutPlayer)
router.get('/team/:id', auth('showTeamNews'), NewsController.showAboutTeam)
router.get('/competiton/:id', auth('showCompetitionNews'), NewsController.showAboutCompetition)
router.get('/user/allPlayersNews', auth('showFollowedPlayersNews'), NewsController.showForUserPlayers)
router.get('/user/allTeamsNews', auth('showFollowedTeamsNews'), NewsController.showForUserTeams)
router.get('/user/allCompetitionsNews', auth('showFollowedCompetitionsNews'), NewsController.showForUserCompetitions)

router.delete('/delete/:id', auth('deleteNews'), NewsController.delete)

module.exports = router