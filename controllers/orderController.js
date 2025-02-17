const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결 객체 가져오기
const Order = require('../models/Order');

// 거래 조회 (전체)
const getAllOrders = async (req, res) => {
    try {
        const db = getDb();
        const orders = await db.collection('orders').find({}).toArray();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 거래 생성
const createOrder = async (req, res) => {
    try {
        const { requesterId, accepterId, orderState, items, fee } = req.body;
        const db = getDb();
        
        const newOrder = new Order(requesterId, accepterId, orderState, items, fee);
        
        const result = await db.collection('orders').insertOne(newOrder);
        
        res.status(201).json({ message: 'Order created', order: { ...newOrder, _id: result.insertedId } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 거래 삭제
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const db = getDb();

        const result = await db.collection('orders').deleteOne({ _id: new ObjectId(orderId) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Order with id ${orderId} not found` });
        }
        
        res.json({ message: `Order ${orderId} deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 거래 상태 업데이트
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderState } = req.body;
        const db = getDb();

        const result = await db.collection('orders').updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { orderState } }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `Order with id ${orderId} not found` });
        }
        
        res.json({ message: `Order ${orderId} updated to state ${orderState}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 거래 수정
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        const db = getDb();

        const result = await db.collection('orders').updateOne(
            { _id: new ObjectId(orderId) },
            { $set: updateData }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `Order with id ${orderId} not found` });
        }
        
        res.json({ message: `Order ${orderId} updated`, data: updateData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    deleteOrder,
    updateOrderStatus,
    updateOrder
};
