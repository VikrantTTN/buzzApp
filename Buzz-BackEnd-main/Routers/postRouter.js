const express = require('express');
const postRouter = express.Router();
const {createPost} = require('../Controller/postController')
postRouter
.route('/')
.post(createPost)


module.exports = postRouter;