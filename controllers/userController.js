const User = require('../models/User');

// TODO: DB에서 사용자 조회
let users = [];

const userController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({ message: '모든 필드를 입력해주세요.' })
            }

            const user = users.find(user => user.email === email)
            if (!user) {
                return res.status(400).json({ message: '가입되지 않은 계정입니다.' })
            }

            if (user.password !== password) {
                return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' })
            }

            // TODO: 로그인 성공 시 JWT 토큰 발급
            res.status(200).json({ message: '로그인 성공' })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    logout: async (req, res) => {
        try {
            // TODO: 토큰 삭제
            res.json({ message: '로그아웃 성공' })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    register: async (req, res) => {
        try {
            const { userName, userEmail, password } = req.body;
            if (!userName || !userEmail || !password) {
                return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
            }

            const existingUser = users.find(user => user.userEmail === userEmail);
            if (existingUser) {
                return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
            }

            const newUser = new User(
                users.length + 1,
                userName,
                userEmail,
                password,
                new Date()
            );

            // TODO: DB에 저장
            users.push(newUser);
            res.json({ message: '사용자 생성 성공' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const userId = req.params.id;
            const userIndex = users.findIndex(user => user.userId == userId);

            if (userIndex === -1) {
                return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            // TODO: DB에서 삭제
            users.splice(userIndex, 1);
            res.json({ message: '사용자 삭제 성공' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // getUser: async (req, res) => {
    //     try {
    //         const userId = req.params.id
    //         // 사용자 정보 조회 로직
    //         res.json({ user: { id: userId } })
    //     } catch (err) {
    //         res.status(500).json({ message: err.message })
    //     }
    // }
}

module.exports = userController
