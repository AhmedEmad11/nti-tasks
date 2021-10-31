const router = require('express').Router()
const NewsController = require('../controllers/news.controller')
const UserController = require("../controllers/user.controller")

const auth = require('../middleware/auth.middleware')

router.post("/register", UserController.register)
router.post('/login', UserController.login)
router.get('/profile', auth('showProfile'), UserController.profile)
router.post("/logoutAll", auth('logoutAll'), UserController.logoutAll)
router.post("/logout", auth('logout'), UserController.logout)
router.delete('/delete/', auth('deleteUser'), UserController.delete)

router.post('/followPlayer', auth('followPlayer'), UserController.followPlayer)
router.post('/followTeam', auth('followTeam'), UserController.followTeam)
router.post('/followCompetition', auth('followCompetition'), UserController.followCompetition)

router.post('/unFollowPlayer', auth('unFollowPlayer'), UserController.unFollowPlayer)
router.post('/unFollowTeam', auth('unFollowTeam'), UserController.unFollowTeam)
router.post('/unFollowCompetition', auth('unFollowCompetition'), UserController.unFollowCompetition)

router.get('/players', auth('showFollowedPlayers'), UserController.showPlayers)
router.get('/teams', auth('showFollowedTeams'), UserController.showTeams)
router.get('/competitions', auth('showFollowedCompetitions'), UserController.showCompetitions)


router.get('/allPlayersNews', auth('showFollowedPlayersNews'), NewsController.showForUserPlayers)
router.get('/allTeamsNews', auth('showFollowedTeamsNews'), NewsController.showForUserTeams)
router.get('/allCompetitionsNews', auth('showFollowedCompetitionsNews'), NewsController.showForUserCompetitions)

module.exports = router