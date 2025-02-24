const { ObjectId } = require('mongodb');
const { getDb } = require('../db');
const Post = require('../models/Post');

// 게시글 생성
const createPost = async ({ userId, title, content, tags }) => {
    const db = getDb();
    const newPost = new Post(userId, title, content, tags);
    const result = await db.collection('posts').insertOne(newPost);
    return { _id: result.insertedId, ...newPost };
};

// 모든 게시글 조회
const getAllPosts = async () => {
    const db = getDb();
    const posts = await db.collection('posts')
        .find()
        .sort({ createdAt: -1 })
        .toArray();
    return posts;
};

// 특정 게시글 조회
const getPostById = async (postId) => {
    const db = getDb();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
    return post;
};

// 게시글 수정
const updatePost = async (postId, { title, content, tags }) => {
    const db = getDb();
    const updatedPost = {
        ...(title && { title }),
        ...(content && { content }),
        ...(tags && { tags }),
        updatedAt: new Date()
    };

    const result = await db.collection('posts').updateOne(
        { _id: new ObjectId(postId) },
        { $set: updatedPost }
    );

    if (result.matchedCount === 0) {
        throw new Error(`Post ${postId} not found`);
    }

    return { message: `Post ${postId} updated`, updatedPost };
};

// 게시글 삭제
const deletePost = async (postId) => {
    const db = getDb();
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(postId) });

    if (result.deletedCount === 0) {
        throw new Error(`Post ${postId} not found`);
    }

    return { message: `Post ${postId} deleted` };
};

// // 댓글 추가 (내장 문서 사용)
// const addComment = async (postId, { userId, content }) => {
//     const db = getDb();
//     const comment = {
//         _id: new ObjectId(),
//         userId,
//         content,
//         createdAt: new Date()
//     };

//     const result = await db.collection('posts').updateOne(
//         { _id: new ObjectId(postId) },
//         { $push: { comments: comment } }
//     );

//     if (result.matchedCount === 0) {
//         throw new Error(`Post ${postId} not found`);
//     }

//     return { message: 'Comment added', comment };
// };

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    // addComment
};