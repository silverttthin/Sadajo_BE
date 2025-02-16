const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');

// 채팅방 생성
router.post('/', chatController.createChat);

// 유저별 채팅방 조회
router.get('/user/:userId', chatController.getChatsByUser);

// 채팅방 삭제
router.delete('/:chatId', chatController.deleteChat);

module.exports = router;