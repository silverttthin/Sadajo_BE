const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결
const Chat = require('../models/Chat');

// 📌 채팅방 생성
const createChat = async (req, res) => {
    try {
        const { requesterId, accepterId } = req.body;

        if (!requesterId || !accepterId) {
            return res.status(400).json({ message: `Both requesterId and accepterId are required.` });
        }

        if (requesterId == accepterId) {
            return res.status(400).json({ message: `RequesterId and AccepterId must be different.` });
        }

        const db = getDb();

        const existingChat = await db.collection('chats').findOne({
            $or: [
                { requesterId: requesterId, accepterId: accepterId },
                { requesterId: accepterId, accepterId: requesterId }
            ]
        });

        if (existingChat) {
            return res.status(400).json({ message: `Chat already exists between ${requesterId} and ${accepterId}.` });
        }

        const newChat = {
            requesterId,
            accepterId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('chats').insertOne(newChat);
        res.status(201).json({ _id: result.insertedId, ...newChat });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 특정 사용자의 채팅방 조회
const getChatsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const db = getDb();

        const chats = await db.collection('chats').find({
            $or: [{ requesterId: userId }, { accepterId: userId }]
        }).toArray();

        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 채팅방 삭제
const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const db = getDb();

        const result = await db.collection('chats').deleteOne({ _id: new ObjectId(chatId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `The chat with ID ${chatId} could not be found.` });
        }

        res.json({ message: `Chat with ID ${chatId} has been successfully deleted.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createChat,
    getChatsByUser,
    deleteChat
};