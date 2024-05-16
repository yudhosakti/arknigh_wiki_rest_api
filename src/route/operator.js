const express = require('express');
const operatorController = require('../controller/main/operator');

const router = express.Router();


router.get('/',operatorController.getAllOperator);
router.get('/:className',operatorController.getAllOperatorByClass)
router.get('/single/:id',operatorController.getSingleOperatorDetail)
router.get('/all/popular',operatorController.getPopularOperatorByClass)
router.get('/all/recent',operatorController.getRecentOperator)


module.exports = router;
