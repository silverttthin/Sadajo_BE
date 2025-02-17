const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결 객체 가져오기
const Chat = require('../models/Chat');

const createChat = async (req, res) => {
    try {
        const db = getDb();
        const { requesterId, accepterId } = req.body;
        const newChat = {
            requesterId,
            accepterId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('chat').insertOne(newChat);
        res.status(201).json({ _id: result.insertedId, ...newChat });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getChatsByUser = async (req, res) => {
    try {
        const db = getDb();
        const { userId } = req.params;
        
        const chats = await db.collection('chat').find({
            $or: [{ requesterId: userId }, { accepterId: userId }]
        }).toArray();

        if (chats.length === 0) {
            return res.status(404).json({ message: `No chats found for user ${userId}` });
        }

        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteChat = async (req, res) => {
    try {
        const db = getDb();
        const { chatId } = req.params;

        const result = await db.collection('chat').deleteOne({ _id: new ObjectId(chatId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Chat ${chatId} not found` });
        }

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