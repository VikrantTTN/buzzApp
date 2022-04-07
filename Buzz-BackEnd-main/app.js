const express = require('express');
const userRouter = require('./Routers/userRouter')

const app = express();
app.use(express.json());
app.listen(5000, () => {
    console.log('listining');
})

app.use('/', userRouter);
