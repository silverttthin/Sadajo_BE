const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

// 컨트롤러와 라우트 연결
router.get('/', mainController.home)

module.exports = router