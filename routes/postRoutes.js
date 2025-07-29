const express = require('express');
const router = express.Router(); 
const { edit1Post, createPost, getAllPosts, de1Post } = require('../controller/postController');
const authorize = require('../middleware/authorize');

router.put('/editpost/:id', edit1Post)

router.post('/',authorize(["Admin", "User"]) ,createPost)

router.get('/allpost', getAllPosts)

router.delete('/:id', authorize(["Admin", "User"]), de1Post)

module.exports = router;