const express = require('express');
const eventController = require('../controller/main/event');

const router = express.Router();

router.get('/single/:id',eventController.getSingleEventDetail)
router.get('/recent',eventController.getRecentEvent)
router.get('/recent/reward',eventController.getRecentEventWithRewardCN)

module.exports = router;