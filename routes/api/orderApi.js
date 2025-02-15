const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/api/orderController');

// 거래 조회
router.get('/', orderController.getAllOrders);

// 거래 생성
router.post('/', orderController.createOrder);

// 거래 삭제
router.delete('/:orderId', orderController.deleteOrder);

// 거래 상태 업데이트
router.patch('/:orderId/status', orderController.updateOrderStatus);

// 거래 수정
router.put('/:orderId', orderController.updateOrder);

module.exports = router;
