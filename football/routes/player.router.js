const router = require('express').Router()
const PlayerController = require("../controllers/player.controller")

router.get('/showAll', PlayerController.showAll)
router.get('/showOne/:id', PlayerController.showOne)

module.exports = router