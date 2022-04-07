const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routers/userRouter')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
    console.log('listining at port 5000');
})

app.use('/', userRouter);
