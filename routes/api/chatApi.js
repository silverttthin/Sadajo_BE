const express = require('express')
const router = express.Router()
const chatController = require('../../controllers/api/chatController')

// '/api/chats' endpoint
router.get('/', chatController.getChats)
router.get('/:id', chatController.getChat)
router.post('/', chatController.createChat)
router.put('/:id', chatController.updateChat)
router.delete('/:id', chatController.deleteChat)

module.exports = router