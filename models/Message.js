class Message {
    constructor(messageId, chatId, senderId, content, createdAt) {
        this.messageId = messageId;       // PK: (Int) 메시지 ID
        this.chatId = chatId;             // FK: (String) 채팅방 ID
        this.senderId = senderId;         // FK: (String) 송신자 ID
        this.content = content;           // (String) 메시지 내용
        this.createdAt = createdAt; // (Date) 메시지 작성일시
    }
}

module.exports = Message;