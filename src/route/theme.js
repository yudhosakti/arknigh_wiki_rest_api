const themeController = require('../controller/main/theme')

const express = require('express')

const router = express.Router()

router.get('/',themeController.getAllTheme)
router.get('/single/:id',themeController.getSingleTheme)
router.get('/stage',themeController.getAllStageByTheme)

module.exports = router