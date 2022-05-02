const mongoose = require('mongoose');
const emailValidator = require('email-validator')

const db_link = "mongodb+srv://admin:qs4MdZxej78Hh3Uy@cluster0.floao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
    .then((db) => {
        console.log("db connect");
    }).catch((err) => {
        console.log(err);
    })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    googleId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: false,
        minLength: 8,
        validate: function () {
            return this.confirmPassword === this.password;
        }
    },
    friends:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:10
    },
    profileImg:{
        type:String,
    }
})

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

//model

const userModel = mongoose.model('userModel', userSchema, "Buzz Users");


module.exports = userModel