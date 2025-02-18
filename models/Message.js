// class Message {
//     constructor(messageId, chatId, senderId, content, createdAt) {
//         this.messageId = messageId;       // PK: (Int) 메시지 ID
//         this.chatId = chatId;             // FK: (String) 채팅방 ID
//         this.senderId = senderId;         // FK: (String) 송신자 ID
//         this.content = content;           // (String) 메시지 내용
//         this.createdAt = createdAt; // (Date) 메시지 작성일시
//     }
// }

class Message {
    constructor(chatId, senderId, content, createdAt) {
        this.chatId = chatId; // (String) 채팅방 ID 
        this.senderId = senderId; // (String) 송신자 ID 
        this.content = content; // (String) 메시지 내용 
        this.read = this.read || false; // (Boolean) 메시지 읽음 여부 (기본값: false)
        this.createdAt = createdAt || new Date(); // (Date) 메시지 작성일시 (기본값: 현재 시간) 
    }
}

module.exports = Message;