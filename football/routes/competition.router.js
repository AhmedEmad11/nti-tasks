const router = require('express').Router()
const CompetitionController = require("../controllers/competition.controller")
const auth = require('../middleware/auth.middleware')

// router.get('/addOrUpdate/:id', auth('addOrUpdate'), CompetitionController.addOrUpdate)
// router.get('/addOrUpdateTeams/:id', auth('addOrUpdateTeams'), CompetitionController.addOrUpdateTeams)

router.get('/showAll', auth('showAllCompetitions'), CompetitionController.showAll)
router.get('/showOne/:id', auth('showOneCompetition'), CompetitionController.showOne)

// router.delete('/delete/:id', auth('deleteCompetitions'), CompetitionController.delete)

module.exports = router