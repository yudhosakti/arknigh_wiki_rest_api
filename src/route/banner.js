const express = require('express')
const bannerController = require('../controller/main/banner')

const router = express.Router()

router.get('/',bannerController.getAllBanner)
router.get('/single/:id',bannerController.getSingleBannerDetail)
router.get('/all/recent',bannerController.getRecentBanner)
router.get('/all/filter',bannerController.getAllBannerFilter)



module.exports = router;
