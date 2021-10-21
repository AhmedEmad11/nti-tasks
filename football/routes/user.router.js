const router = require('express').Router()
const UserController = require("../controllers/user.controller")
const auth = require('../middleware/auth.middleware')

router.post("/addPermission", auth('addPermission'), UserController.addPermission)
router.post("/addRole", auth('addRole'), UserController.addRole)
router.post("/addRoleToUser", auth('addRoleToUser'), UserController.addRoleToUser)

router.post("/register", UserController.register)
router.post('/login', UserController.login)
router.get('/profile', auth('showProfile'), UserController.profile)
router.post("/logoutAll", auth('logoutAll'), UserController.logoutAll)
router.post("/logout", auth('logout'), UserController.logout)
router.delete('/delete/', auth('deleteUser'), UserController.delete)

router.post('/followPlayer', auth('followPlayer'), UserController.followPlayer)
router.post('/followTeam', auth('followTeam'), UserController.followTeam)
router.post('/followCompetiton', auth('followCompetition'), UserController.followCompetition)

router.get('/players', auth('showFollowedPlayers'), UserController.showPlayers)
router.get('/teams', auth('showFollowedTeams'), UserController.showTeams)
router.get('/competitions', auth('showFollowedCompetitions'), UserController.showCompetitions)

module.exports = router