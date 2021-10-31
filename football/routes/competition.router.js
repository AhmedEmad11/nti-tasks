const router = require('express').Router()
const CompetitionController = require("../controllers/competition.controller")

router.get('/showAll',  CompetitionController.showAll)
router.get('/showOne/:id', CompetitionController.showOne)

module.exports = router