const router = require('express').Router()
const TeamController = require("../controllers/team.controller")
const auth = require('../middleware/auth.middleware')

router.get('/addOrUpdateSquad/:id', auth('addOrUpdateSquad'), TeamController.addOrUpdateTeamSquad)
router.delete('/delete/:id', auth('deleteTeam'), TeamController.delete)

router.get('/showAll', auth('showAllTeams'), TeamController.showAll)
router.get('/showOne/:id', auth('showOneTeam'), TeamController.showOne)

module.exports = router