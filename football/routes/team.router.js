const router = require('express').Router()
const TeamController = require("../controllers/team.controller")

router.get('/showAll', TeamController.showAll)
router.get('/showOne/:id', TeamController.showOne)

module.exports = router