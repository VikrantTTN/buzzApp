const express = require('express');
const postRouter = express.Router();
const {createPost , updatePost , deletePost , likePost ,getPost , feedsPost} = require('../Controller/postController')
postRouter
.route('/')
.post(createPost)

postRouter
.route('/feeds')
.post(feedsPost)


postRouter
.route('/:id')
.get(getPost)
.patch(updatePost)
.delete(deletePost)

postRouter
.route('/:id/like')
.patch(likePost)


module.exports = postRouter;