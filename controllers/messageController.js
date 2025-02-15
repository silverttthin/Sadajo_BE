const Message = require('../../models/Message');

// 메시지 생성
const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, content } = req.body;
        const newMessage = new Message(null, chatId, senderId, content, new Date());

        // TODO: DB에 newMessage 저장
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 채팅방별 메시지 조회
const getMessagesByChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        // TODO: chatId를 기반으로 해당 채팅방의 모든 메시지 조회
        const messages = []; // DB에서 해당 chatId로 조회한 메시지들

        if (messages.length === 0) {
            return res.status(404).json({ message: `No messages found for chat ${chatId}` });
        }

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 메시지 읽음 표시
const markMessageAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;

        // TODO: messageId를 기반으로 메시지의 읽음 표시 업데이트
        res.json({ message: `Message ${messageId} marked as read` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createMessage,
    getMessagesByChat,
    markMessageAsRead
};