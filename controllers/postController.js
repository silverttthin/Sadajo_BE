const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결
const Post = require('../models/Post');
const postService = require('../services/postService');

// 📌 게시글 생성
const createPost = async (req, res) => {
    try {
        const { userId, title, content, tags } = req.body;
        // todo: req validation(유저가 실제로 존재하는지, 태그가 존재하는지 등..)
        const newPost = await postService.createPost({ userId, title, content, tags });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 모든 게시글 조회
const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// 📌 특정 게시글 조회
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postService.getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: `Post ${postId} not found` });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 게시글 수정
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, tags } = req.body;
        const updatedData = await postService.updatePost(postId, { title, content, tags });
        res.json(updatedData);
    } catch (err) {
        if (err.message.includes('not found')) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

// 📌 게시글 삭제
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const result = await postService.deletePost(postId);
        res.json(result);
    } catch (err) {
        if (err.message.includes('not found')) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

// // 📌 댓글 추가 (내장 문서 사용)
// const addComment = async (req, res) => {
//     try {
//         const { postId } = req.params;
//         const { userId, content } = req.body;
//         const db = getDb();

//         const comment = {
//             _id: new ObjectId(),
//             userId,
//             content,
//             createdAt: new Date()
//         };

//         const result = await db.collection('posts').updateOne( // ✅ posts로 변경
//             { _id: new ObjectId(postId) },
//             { $push: { comments: comment } }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ message: `Post ${postId} not found` });
//         }

//         res.json({ message: `Comment added`, comment });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    // addComment
};