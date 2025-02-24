const orderService = require('../services/orderService');

// 거래 조회 (전체)
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 거래 생성
const createOrder = async (req, res) => {
    try {
        const { requesterId, accepterId, orderState, items, fee } = req.body;
        // todo: validation (실제 존재하는 유저들의 아이디인가)
        const result = await orderService.createOrder({ requesterId, accepterId, orderState, items, fee });
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 거래 삭제
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await orderService.deleteOrder(orderId);
        res.json(result);
    } catch (err) {
        if (err.message.includes('not found')) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

// 거래 상태 업데이트
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderState } = req.body;
        const result = await orderService.updateOrderStatus(orderId, { orderState });
        res.json(result);
    } catch (err) {
        if (err.message.includes('not found')) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

// 거래 수정
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        const result = await orderService.updateOrder(orderId, updateData);
        res.json(result);
    } catch (err) {
        if (err.message.includes('not found')) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    deleteOrder,
    updateOrderStatus,
    updateOrder
};