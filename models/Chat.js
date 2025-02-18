// class Chat {
//     constructor(chatId, requesterId, accepterId, createdAt, updatedAt) {
//         this.chatId = chatId;                   // PK: (Int) 채팅방 ID
//         this.requesterId = requesterId;         // FK: (Int) 요청자 ID
//         this.accepterId = accepterId;           // FK: (Int) 응답자 ID
//         this.createdAt = createdAt; // (Date) 채팅방 생성일시
//         this.updatedAt = updatedAt; // (Date) 채팅방 업데이트일시
//     }
// }

class Chat {
    constructor(requesterId, accepterId, createdAt, updatedAt) {
        this.requesterId = requesterId;         // (String) 신청자 ID
        this.accepterId = accepterId;           // (String) 구매대행자 ID
        this.createdAt = createdAt || new Date(); // (Date) 채팅방 생성일시 (기본값: 현재 시간)
        this.updatedAt = updatedAt || new Date(); // (Date) 채팅방 업데이트일시 (기본값: 현재 시간)
    }
}

module.exports = Chat;