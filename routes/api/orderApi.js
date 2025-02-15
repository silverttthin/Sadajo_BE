const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/api/orderController');

router.get('/', orderController.getAllOrders);           // 거래 조회
router.post('/', orderController.createOrder);          // 거래 생성
router.delete('/:orderId', orderController.deleteOrder); // 거래 삭제
router.patch('/:orderId/status', orderController.updateOrderStatus); // 거래 상태 업데이트
router.put('/:orderId', orderController.updateOrder);   // 거래 수정

module.exports = router;
