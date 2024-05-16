const express = require('express')
const enemyController = require('../controller/main/enemy')

const router = express.Router()


router.get('/',enemyController.getAllEnemy)
router.get('/filter',enemyController.getAllEnemyFilter)
router.get('/single/:id',enemyController.getSingleEnemyDetail)

module.exports = router