const mongoose = require('mongoose');

const db_link = "mongodb+srv://admin:qs4MdZxej78Hh3Uy@cluster0.floao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
    .then((db) => {
        console.log("posts db connect");
    }).catch((err) => {
        console.log(err);
    })


const postSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        max:500
    },
    image:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
},{ timestamps: true })

const postModel = mongoose.model('postModel', postSchema, "Buzz posts");

module.exports = postModel;