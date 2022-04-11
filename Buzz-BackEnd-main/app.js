const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routers/userRouter');
const postRouter = require('./Routers/postRouter')

const app = express();
app.use(cookieParser());
app.use(express.json());

app.listen(5000, () => {
    console.log('listining at port 5000');
})

app.use('/', userRouter);
app.use('/posts', postRouter)
