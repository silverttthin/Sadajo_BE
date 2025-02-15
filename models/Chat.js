class Chat {
    constructor(chatId, requesterId, accepterId, createdAt, updatedAt) {
        this.chatId = chatId;                   // PK: (Int) 채팅방 ID
        this.requesterId = requesterId;         // FK: (Int) 요청자 ID
        this.accepterId = accepterId;           // FK: (Int) 응답자 ID
        this.createdAt = createdAt; // (Date) 채팅방 생성일시
        this.updatedAt = updatedAt; // (Date) 채팅방 업데이트일시
    }
}

module.exports = Chat;