const Post = require('../../models/Post');

// 게시글 단건 조회
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        // TODO: postId를 기반으로 게시글 조회
        const post = {}; // DB에서 해당 postId로 찾은 게시글

        if (!post) {
            return res.status(404).json({ message: `Post with id ${postId} not found` });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 게시글 전체 조회
const getAllPosts = async (req, res) => {
    try {
        // TODO: DB에서 모든 게시글 조회
        const posts = []; // DB에서 들고온 게시글들
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 게시글 생성
const createPost = async (req, res) => {
    try {
        const { writerId, title, content } = req.body;
        const newPost = new Post(null, writerId, title, content, new Date());

        // TODO: DB에 newPost 저장
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 게시글 삭제
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // TODO: postId를 기반으로 게시글 삭제
        res.json({ message: `Post ${postId} deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 게시글 수정
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const updateData = req.body;

        // TODO: postId를 찾아서 updateData 반영
        res.json({ message: `Post ${postId} updated`, data: updateData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    updatePost
};
