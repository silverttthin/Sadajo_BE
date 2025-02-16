const Order = require('../models/Order');

// 거래 조회 (전체)
const getAllOrders = async (req, res) => {
    try {
        // TODO: DB에서 모든 거래 조회
        const orders = []; // DB에서 들고온 거래들
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 거래 생성
const createOrder = async (req, res) => {
    try {
        const { requesterId, accepterId, orderState, items, fee } = req.body;
        const newOrder = new Order(null, requesterId, accepterId, orderState, new Date(), items, fee);

        // TODO: DB에 newOrder 저장
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 거래 삭제
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // TODO: orderId를 기반으로 거래 삭제
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

        // TODO: orderId를 찾아서 orderState 업데이트
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

        // TODO: orderId를 찾아서 updateData 반영
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
