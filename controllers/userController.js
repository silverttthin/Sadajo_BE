const userController = {
    getUsers: (req, res) => {
        // 나중에 DB에서 사용자 목록을 가져와서 반환
        res.json({ users: [] })
    },

    createUser: (req, res) => {
        // req.body에서 사용자 정보를 받아서 생성
        const { username, email } = req.body
        res.json({ message: '사용자 생성 성공' })
    },

    getUser: (req, res) => {
        // req.params.id로 특정 사용자 정보 조회
        const userId = req.params.id
        res.json({ user: { id: userId } })
    }
}

module.exports = userController