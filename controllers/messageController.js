const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결
const Message = require('../models/Message');

// 📌 메시지 생성
const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, content } = req.body;

        if (!chatId || !senderId || !content) {
            return res.status(400).json({ message: `ChatId, senderId, and content are required.` });
        }

        const db = getDb();

        const chat = await db.collection('chats').findOne({ _id: new ObjectId(chatId) });
        if (!chat) {
            return res.status(404).json({ message: `The chat with ID ${chatId} could not be found.` });
        }

        if (chat.requesterId !== senderId && chat.accepterId !== senderId) {
            return res.status(403).json({ message: `Sender is not a participant in this chat.` });
        }

        const newMessage = {
            chatId: new ObjectId(chatId),
            senderId: senderId,
            content: content,
            createdAt: new Date(),
            read: false
        };

        const result = await db.collection('messages').insertOne(newMessage);

        await db.collection('chats').updateOne(
            { _id: new ObjectId(chatId) },
            { $set: { updatedAt: new Date() } }
        );

        res.status(201).json({
            _id: result.insertedId,
            ...newMessage
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 채팅방별 메시지 조회
const getMessagesByChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const db = getDb();


        const chat = await db.collection('chats').findOne({ _id: new ObjectId(chatId) });
        if (!chat) {
            return res.status(404).json({ message: `The chat with ID ${chatId} could not be found.` });
        }

        const messages = await db.collection('messages')
            .find({ chatId: new ObjectId(chatId) })
            .sort({ createdAt: 1 })
            .toArray();

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 메시지 읽음 표시
// TODO: 현재 시간 이전의 모든 메시지를 읽음(read)으로 표시할지 여부 논의
const markMessageAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const db = getDb();

        const result = await db.collection('messages').updateOne(
            { _id: new ObjectId(messageId) },
            { $set: { read: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `The message with ID ${messageId} could not be found` });
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
