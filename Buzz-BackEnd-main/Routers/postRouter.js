const express = require('express');
const postRouter = express.Router();
const {createPost , updatePost , deletePost , likePost ,getPost , feedsPost,userPost , userPostById} = require('../Controller/postController');
const {createComment , getComments , deleteComment} = require('../Controller/commentController');
const protectedRoute = require('../Middleware/protectedRoute');



postRouter.use(protectedRoute);


postRouter
.route('/')
.post(createPost);

postRouter.get('/feedPosts',feedsPost);
postRouter.get('/userPosts' , userPost);
postRouter.get('/userPosts/:id',userPostById);
postRouter.get('/comments/:id', getComments);
postRouter.post('/comments' , createComment);
postRouter.delete('/comments',deleteComment);

postRouter
.route('/:id')
.get(getPost)
.patch(updatePost)
.delete(deletePost);

postRouter
.route('/:id/like')
.patch(likePost);



module.exports = postRouter;