// class Order {
//     constructor(orderId, requesterId, accepterId, orderState, createdAt, items, fee) {
//         this.orderId = orderId;         // PK: (Int) 거래 ID
//         this.requesterId = requesterId; // FK: (Int) 신청자 ID
//         this.accepterId = accepterId;   // FK: (Int) 구매대행자 ID
//         this.orderState = orderState;   // (Int) 거래 상태
//         this.createdAt = createdAt;     // (Date) 거래 체결일시
//         this.items = items;             // (Item[]) 품목 리스트
//         this.fee = fee;                 // (Int) 수고비
//     }
// }

// module.exports = Order;

class Order {
    constructor(requesterId, accepterId, orderState, items, fee, createdAt) {
        this.requesterId = requesterId; // (String) 신청자 ID
        this.accepterId = accepterId;   // (String) 구매대행자 ID
        this.orderState = orderState || 0; // (Int) 거래 상태 (기본값: 0)
        this.items = items || [];       // (Array) 품목 리스트
        this.fee = fee || 0;            // (Int) 수고비 (기본값: 0)
        this.createdAt = createdAt || new Date(); // (Date) 생성일 (기본값: 현재 시간)
    }
}

module.exports = Order;