const express = require('express');
const userRouter = express.Router();
const { signupUser, loginUser, googleSignIn, getuser } = require('../Controller/userController');
const protectedRoute = require('../Middleware/protectedRoute')

userRouter.post("/auth/google", googleSignIn);

userRouter
.route('/signup')
.post(signupUser)

userRouter
.route('/login')
.post(loginUser)

userRouter.use(protectedRoute)
userRouter
.route('/feeds')
.get(getuser)



module.exports = userRouter; 