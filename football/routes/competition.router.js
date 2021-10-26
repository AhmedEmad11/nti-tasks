const router = require('express').Router()
const CompetitionController = require("../controllers/competition.controller")

const auth = require('../middleware/auth.middleware')

router.get('/showAll', auth('showAllCompetitions'), CompetitionController.showAll)
router.get('/showOne/:id', auth('showOneCompetition'), CompetitionController.showOne)

module.exports = router