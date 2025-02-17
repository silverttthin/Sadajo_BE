const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결
const Message = require('../models/Message');

// 📌 메시지 생성
const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, content } = req.body;
        const db = getDb();
        const newMessage = {
            chatId: new ObjectId(chatId),
            senderId: senderId,
            content: content,
            createdAt: new Date()
        };

        const result = await db.collection('message').insertOne(newMessage);
        newMessage._id = result.insertedId;

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 채팅방별 메시지 조회
const getMessagesByChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const db = getDb();

        const messages = await db.collection('message')
            .find({ chatId: new ObjectId(chatId) })
            .sort({ createdAt: 1 })
            .toArray();

        if (messages.length === 0) {
            return res.status(404).json({ message: `No messages found for chat ${chatId}` });
        }

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 메시지 읽음 표시 (예: 읽음 필드를 추가)
const markMessageAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const db = getDb();

        const result = await db.collection('message').updateOne(
            { _id: new ObjectId(messageId) },
            { $set: { read: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `Message ${messageId} not found` });
        }

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
