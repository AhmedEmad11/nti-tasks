const router = require('express').Router()

const adminController = require("../controllers/admin.controller")

const auth = require('../middleware/auth.middleware')

router.get('/addOrUpdateTeamSquad/:id', auth('addOrUpdateTeamSquad'), adminController.addOrUpdateTeamSquad)
router.delete('/deleteTeam/:id', auth('deleteTeam'), adminController.deleteTeam)

router.post("/addPermission", auth('addPermission'), adminController.addPermission)
router.post("/addRole", auth('addRole'), adminController.addRole)
router.post("/addRoleToUser", auth('addRoleToUser'), adminController.addRoleToUser)
router.post("/addPermissionToRole", auth('addPermissionToRole'), adminController.addPermissionToRole)

router.post('/addNews', auth('addNews'), adminController.addNews)
router.delete('/deleteNews/:id', auth('deleteNews'), adminController.deleteNews)

router.get('/addOrUpdateCompetition/:id', auth('addOrUpdate'), adminController.addOrUpdate)
router.get('/addOrUpdateCompetitionTeams/:id', auth('addOrUpdateTeams'), adminController.addOrUpdateTeams)
router.delete('/deleteCompetition/:id', auth('deleteCompetition'), adminController.deleteCompetition)

module.exports = router