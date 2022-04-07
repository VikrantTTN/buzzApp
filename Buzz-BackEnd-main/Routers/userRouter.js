const express = require('express');
const userRouter = express.Router();
const {signupUser , loginUser} = require('../Controller/userController');

userRouter
    .route('/signup')
    .post(signupUser)

userRouter
    .route('/login')
    .post(loginUser)


module.exports = userRouter; 