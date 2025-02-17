const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결
const Post = require('../models/Post');

// 📌 게시글 생성
const createPost = async (req, res) => {
    try {
        const { userId, title, content, tags } = req.body;
        const db = getDb();

        const newPost = new Post(userId, title, content, tags);
        const result = await db.collection('posts').insertOne(newPost); // ✅ posts로 변경

        res.status(201).json({ _id: result.insertedId, ...newPost });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 📌 모든 게시글 조회
const getAllPosts = async (req, res) => {
    try {
        const db = getDb();
        const posts = await db.collection('posts').find().sort({ createdAt: -1 }).toArray(); // ✅ posts로 변경

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 특정 게시글 조회
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const db = getDb();

        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });

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
        const db = getDb();

        const updatedPost = {
            ...(title && { title }),
            ...(content && { content }),
            ...(tags && { tags }),
            updatedAt: new Date()
        };

        const result = await db.collection('posts').updateOne( // ✅ posts로 변경
            { _id: new ObjectId(postId) },
            { $set: updatedPost }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `Post ${postId} not found` });
        }

        res.json({ message: `Post ${postId} updated`, updatedPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 게시글 삭제
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const db = getDb();

        const result = await db.collection('posts').deleteOne({ _id: new ObjectId(postId) }); // ✅ posts로 변경

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Post ${postId} not found` });
        }

        res.json({ message: `Post ${postId} deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 댓글 추가 (내장 문서 사용)
const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, content } = req.body;
        const db = getDb();

        const comment = {
            _id: new ObjectId(),
            userId,
            content,
            createdAt: new Date()
        };

        const result = await db.collection('posts').updateOne( // ✅ posts로 변경
            { _id: new ObjectId(postId) },
            { $push: { comments: comment } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `Post ${postId} not found` });
        }

        res.json({ message: `Comment added`, comment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment
};