const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, googleSignIn, getuser, logout } = require('../Controller/userController');
const protectedRoute = require('../Middleware/protectedRoute')
const {updateUser , deleteUser , getUserById , addFriend , unFriend} = require('../Controller/CrudUser');
const { post } = require('./postRouter');
userRouter.post("/auth/google", googleSignIn);

userRouter
.route('/signup')
.post(signupUser)

userRouter
.route('/login')
.post(loginUser)

userRouter
.route('/logout')
.get(logout)

userRouter.get('/feeds', protectedRoute, getuser);

userRouter
.route('/feeds/:id')
.patch(updateUser)
.delete(deleteUser)
.get(getUserById)

userRouter
.route('/feeds/:id/addfriend')
.patch(addFriend)

userRouter
.route('/feeds/:id/unfriend')
.patch(unFriend)

module.exports = userRouter; 