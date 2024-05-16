const userController = require('../controller/main/user')

const express = require('express')

const router = express.Router()

router.get('/',userController.getAllUser)
router.get('/single',userController.getSingleUser)
router.post('/',userController.addUser)
router.post('/bookmark',userController.addBookmark)
router.post('/like',userController.addLike)
router.delete('/bookmark',userController.deleteBookmark)
router.delete('/like',userController.deleteLike)
router.put('/',userController.updateUser)
router.put('/password',userController.updatePassword)

module.exports = router