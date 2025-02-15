const express = require('express')
const router = express.Router()
const postController = require('../../controllers/api/postController')

// '/api/posts' endpoint
router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)
router.post('/', postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router