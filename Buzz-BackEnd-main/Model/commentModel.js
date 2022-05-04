const mongoose = require('mongoose');

const db_link = "mongodb+srv://admin:qs4MdZxej78Hh3Uy@cluster0.floao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
    .then((db) => {
        console.log("posts db connect");
    }).catch((err) => {
        console.log(err);
})


const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:[true , 'comment is required']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true , 'comment must belong to a user']
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'postModel',
        require:[true , 'comment must belong to a post']
    }
} , { timestamps: true })

// find  findById findOne

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name profileImage'
    }).populate({
        path:'post'
    });
    next();
})

const commentModel = mongoose.model('commentModel' , commentSchema );