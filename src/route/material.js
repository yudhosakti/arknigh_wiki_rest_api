const express = require('express')

const materialController = require('../controller/main/material')

const router = express.Router()

router.get('/',materialController.getAllMaterial)

router.get('/filter',materialController.getAllMaterialByCategory)

router.get('/single/:id',materialController.getSingleMaterialDetail)

module.exports = router
