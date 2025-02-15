// routes/api/index.js
const express = require('express')
const router = express.Router()

const userApi = require('./userApi')
const postApi = require('./postApi')
const chatApi = require('./chatApi')
const messageApi = require('./messageApi')
const orderApi = require('./orderApi')

// 각 API 라우터 등록
router.use('/users', userApi)
router.use('/posts', postApi)
router.use('/chats', chatApi)
router.use('/messages', messageApi)
router.use('/orders', orderApi)

module.exports = router