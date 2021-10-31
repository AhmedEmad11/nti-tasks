const router = require('express').Router()

const adminController = require("../controllers/admin.controller")

const auth = require('../middleware/auth.middleware')

router.get('/addOrUpdateTeamSquad/:id', auth('addOrUpdateTeamSquad'), adminController.addOrUpdateTeamSquad)
router.delete('/deleteTeam/:id', auth('deleteTeam'), adminController.deleteTeam)

router.post("/addPermission", auth('addPermission'), adminController.addPermission)
router.post("/addRole", auth('addRole'), adminController.addRole)
router.post("/addRoleToUser", auth('addRoleToUser'), adminController.addRoleToUser)
router.post("/addPermissionToRole", auth('addPermissionToRole'), adminController.addPermissionToRole)
router.get("/showPermissions", auth('showPermissions'), adminController.showPermissions)
router.get("/showRoles", auth('showRoles'), adminController.showRoles)

router.post('/addNews', auth('addNews'), adminController.addNews)
router.delete('/deleteNews/:id', auth('deleteNews'), adminController.deleteNews)

router.get('/addOrUpdateCompetition/:id', auth('addOrUpdateCompetition'), adminController.addOrUpdateCompetition)
router.get('/addOrUpdateCompetitionTeams/:id', auth('addOrUpdateCompetitionTeams'), adminController.addOrUpdateTeams)
router.delete('/deleteCompetition/:id', auth('deleteCompetition'), adminController.deleteCompetition)

module.exports = router