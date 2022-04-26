const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const userRouter = require('./Routers/userRouter');
const path = require('path');
const postRouter = require('./Routers/postRouter')

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/images' , express.static(path.join(__dirname,"public/images")));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '/public/images'));
        console.log("multer called ");
    },
    filename:(req,file,cb)=>{
        cb(null , req.body.name);
    }
})
const upload = multer({storage:storage});
app.post('/upload' , upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("file uploaded success")

    }catch(err){
        console.log(err.message);
    }
})

app.use('/', userRouter);
app.use('/posts', postRouter)

app.listen(5000, () => {
    console.log('listining at port 5000');
})