const messageService = require('../services/messageService');

// 📌 메시지 생성
const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, content } = req.body;
        if (!chatId || !senderId || !content) {
            return res.status(400).json({ message: 'ChatId, senderId, and content are required.' });
        }

        const newMessage = await messageService.createMessage({ chatId, senderId, content });
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 채팅방별 메시지 조회
const getMessagesByChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await messageService.getMessagesByChat(chatId);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 메시지 읽음 표시
const markMessageAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const result = await messageService.markMessageAsRead(messageId);
        res.json({ message: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createMessage,
    getMessagesByChat,
    markMessageAsRead
};