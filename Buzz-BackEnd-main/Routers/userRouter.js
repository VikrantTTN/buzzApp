const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, googleSignIn, getuser, logout } = require('../Controller/userController');
const protectedRoute = require('../Middleware/protectedRoute')

userRouter.post("/auth/google", googleSignIn);

userRouter
.route('/signup')
.post(signupUser)

userRouter
.route('/login')
.post(loginUser)

userRouter.get('/feeds', protectedRoute, getuser);



module.exports = userRouter; 