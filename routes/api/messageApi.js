const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/api/messageController');

// 메시지 생성
router.post('/', messageController.createMessage);

// 채팅방별 메시지 조회
router.get('/chat/:chatId', messageController.getMessagesByChat);

// 메시지 읽음 표시
router.put('/:messageId/read', messageController.markMessageAsRead);

module.exports = router;