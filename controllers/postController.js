const { ObjectId } = require('mongodb');
const { getDb } = require('../db'); // DB 연결 객체 가져오기
const Post = require('../models/Post'); // Post 모델 가져오기

// 게시글 단건 조회
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const db = getDb();

        // MongoDB에서 게시글을 조회
        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });

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
        const db = getDb();
        const posts = await db.collection('posts').find({}).toArray();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 게시글 생성
const createPost = async (req, res) => {
    try {
        const { writerId, title, content } = req.body;
        const db = getDb();

        // 새로운 Post 객체 생성
        const newPost = new Post(null, writerId, title, content, new Date());

        // MongoDB에 새로운 게시글 삽입
        const result = await db.collection('posts').insertOne({
            writerId: newPost.writerId,
            title: newPost.title,
            content: newPost.content,
            createdAt: newPost.createdAt
        });

        // 결과 반환
        res.status(201).json({ message: 'Post created', post: { ...newPost, _id: result.insertedId } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 게시글 삭제
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const db = getDb();

        // MongoDB에서 게시글 삭제
        const result = await db.collection('posts').deleteOne({ _id: new ObjectId(postId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `Post with id ${postId} not found` });
        }

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
        const db = getDb();

        // MongoDB에서 게시글 업데이트
        const result = await db.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `Post with id ${postId} not found` });
        }

        res.json({ message: `Post ${postId} updated`, data: updateData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getPostById,
    getAllPosts,
    createPost,
    deletePost,
    updatePost
};