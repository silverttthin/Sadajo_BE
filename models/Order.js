class Order {
    /**
     * @param {number} orderId - 거래 ID (Primary Key)
     * @param {number} requesterId - 신청자 ID (Foreign Key)
     * @param {number} accepterId - 구매자 ID (Foreign Key)
     * @param {number | null} orderState - 거래 상태 (nullable)
     * @param {Date | null} createdAt - 거래 체결 일시 (nullable)
     * @param {Item[] | null} items - 품목 리스트 (nullable) Item도 만들어야 함
     * @param {number | null} fee - 수고비 (nullable)
     */
    constructor(orderId, requesterId, accepterId, orderState = null, createdAt = null, items = null, fee = null) {
        this.orderId = orderId;
        this.requesterId = requesterId;
        this.accepterId = accepterId;
        this.orderState = orderState;
        this.createdAt = createdAt;
        this.items = items;
        this.fee = fee;
    }
}

module.exports = Order;
