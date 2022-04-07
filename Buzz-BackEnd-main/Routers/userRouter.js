const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, googleSignIn } = require('../Controller/userController');

userRouter.post("/auth/google", googleSignIn);

userRouter
    .route('/signup')
    .post(signupUser)

userRouter
    .route('/login')
    .post(loginUser)


module.exports = userRouter; 