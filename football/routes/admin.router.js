const router = require('express').Router()

const UserController = require("../controllers/user.controller")
const TeamController = require("../controllers/team.controller")
const NewsController = require("../controllers/news.controller")
const CompetitionController = require("../controllers/competition.controller")

const auth = require('../middleware/auth.middleware')



router.get('/addOrUpdateTeamSquad/:id', auth('addOrUpdateSquad'), TeamController.addOrUpdateTeamSquad)
router.delete('/deleteTeam/:id', auth('deleteTeam'), TeamController.delete)

router.post("/addPermission", auth('addPermission'), UserController.addPermission)
router.post("/addRole", auth('addRole'), UserController.addRole)
router.post("/addRoleToUser", auth('addRoleToUser'), UserController.addRoleToUser)

router.post('/addNews', auth('addNews'), NewsController.add)
router.delete('/deleteNews/:id', auth('deleteNews'), NewsController.delete)

router.get('/addOrUpdateCompetition/:id', auth('addOrUpdate'), CompetitionController.addOrUpdate)
router.get('/addOrUpdateCompetitionTeams/:id', auth('addOrUpdateTeams'), CompetitionController.addOrUpdateTeams)
router.delete('/deleteCompetition/:id', auth('deleteCompetitions'), CompetitionController.delete)

module.exports = router