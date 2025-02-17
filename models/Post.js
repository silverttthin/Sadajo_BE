// class Post {
//     constructor(postId, writerId, title, content, createdAt) {
//         this.postId = postId;         // PK: (Int) 게시글 ID
//         this.writerId = writerId;     // FK: (Int) 작성자 ID
//         this.title = title;           // (String) 제목
//         this.content = content;       // (String) 내용
//         this.createdAt = createdAt;   // (Date) 작성일시
//     }
// }

// module.exports = Post;

class Post {
    constructor(userId, title, content, tags, comments, createdAt, updatedAt) {
        this.userId = userId;         // (String) 작성자 ID
        this.title = title;           // (String) 게시글 제목
        this.content = content;       // (String) 게시글 내용
        this.tags = tags || [];       // (Array) 태그 목록
        this.comments = comments || []; // (Array) 댓글 목록 (내장 서브 문서)
        this.createdAt = createdAt || new Date(); // (Date) 생성일
        this.updatedAt = updatedAt || new Date(); // (Date) 업데이트일
    }
}

module.exports = Post;