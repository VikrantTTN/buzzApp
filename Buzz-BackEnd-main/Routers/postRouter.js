const express = require('express');
const postRouter = express.Router();
const {createPost , updatePost , deletePost , likePost ,getPost , feedsPost,userPost} = require('../Controller/postController');
const protectedRoute = require('../Middleware/protectedRoute');



postRouter.use(protectedRoute)

postRouter
.route('/')
.post(createPost)

postRouter.get('/feedPosts',feedsPost);
postRouter.get('/userPosts' , userPost)

postRouter
.route('/:id')
.get(getPost)
.patch(updatePost)
.delete(deletePost)

postRouter
.route('/:id/like')
.patch(likePost)


module.exports = postRouter;