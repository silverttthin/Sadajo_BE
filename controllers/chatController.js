const Chat = require('../models/Chat');

// 채팅방 생성
const createChat = async (req, res) => {
    try {
        const { requesterId, accepterId } = req.body;
        const newChat = new Chat(null, requesterId, accepterId, new Date(), new Date());

        // TODO: DB에 newChat 저장
        res.status(201).json(newChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 유저별 채팅방 조회
const getChatsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // TODO: userId를 기반으로 해당 유저와 관련된 채팅방들 조회
        const chats = []; // DB에서 해당 userId로 조회한 채팅방들

        if (chats.length === 0) {
            return res.status(404).json({ message: `No chats found for user ${userId}` });
        }

        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 채팅방 삭제
const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        // TODO: chatId를 기반으로 채팅방 삭제
        res.json({ message: `Chat ${chatId} deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createChat,
    getChatsByUser,
    deleteChat
};
