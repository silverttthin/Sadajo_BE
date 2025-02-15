class Order {
    constructor(orderId, requesterId, accepterId, orderState, createdAt, items, fee) {
        this.orderId = orderId;         // PK: (Int) 거래 ID
        this.requesterId = requesterId; // FK: (Int) 신청자 ID
        this.accepterId = accepterId;   // FK: (Int) 구매대행자 ID
        this.orderState = orderState;   // (Int) 거래 상태
        this.createdAt = createdAt;     // (Date) 거래 체결일시
        this.items = items;             // (Item[]) 품목 리스트
        this.fee = fee;                 // (Int) 수고비
    }
}

module.exports = Order;