const router = require('express').Router()
const TeamController = require("../controllers/team.controller")

const auth = require('../middleware/auth.middleware')

router.get('/showAll', auth('showAllTeams'), TeamController.showAll)
router.get('/showOne/:id', auth('showOneTeam'), TeamController.showOne)

module.exports = router