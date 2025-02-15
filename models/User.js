class User {
    constructor(userId, userName, userEmail, password, createdAt = null) {
        this.userId = userId;           // PK: (Int) 유저 ID     
        this.userName = userName;       // (String) 유저 이름
        this.userEmail = userEmail;     // (String) 유저 이메일
        this.password = password;       // (String) 유저 비밀번호
        this.createdAt = createdAt;     // (Date) 계정 생성일시
    }
}

module.exports = User;
