const chatService = require('../services/chatService');

// 📌 채팅방 생성
const createChat = async (req, res) => {
    try {
        const { requesterId, accepterId } = req.body;

        // 필수 필드 유효성 검사
        if (!requesterId || !accepterId) {
            return res.status(400).json({ message: 'Both requesterId and accepterId are required.' });
        }
        if (requesterId === accepterId) {
            return res.status(400).json({ message: 'RequesterId and AccepterId must be different.' });
        }

        const newChat = await chatService.createChat({ requesterId, accepterId });
        res.status(201).json(newChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 특정 사용자의 채팅방 조회
const getChatsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const chats = await chatService.getChatsByUser(userId);
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 채팅방 삭제
const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const result = await chatService.deleteChat(chatId);
        res.json({ message: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createChat,
    getChatsByUser,
    deleteChat
};