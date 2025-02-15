class Post {
    constructor(postId, writerId, title, content, createdAt) {
        this.postId = postId;         // PK: (Int) 게시글 ID
        this.writerId = writerId;     // FK: (Int) 작성자 ID
        this.title = title;           // (String) 제목
        this.content = content;       // (String) 내용
        this.createdAt = createdAt;   // (Date) 작성일시
    }
}

module.exports = Post;