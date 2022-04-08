const userModel = require('../userModel/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = "kmwnwiniei322in7377342dcd3";


async function signupUser(req, res) {

    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
        const userObj = await userModel.create(user);
        console.log(userObj);
        res.json({
            message: userObj
        })
    } catch (err) {
        res.status(500);
        res.json({
            message: err.message
        })
        console.log(err);
    }

}

async function loginUser(req, res) {
    console.log("Login called");
    try {
        const data = req.body;
        if (data.email) {
            const user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password === data.password) {
                    const uid = user["_id"];
                    const token = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie("login",token)
                    res.json({
                        message: "Logged in"
                    })
                } else {
                    res.send("Wrong password ")
                }
            } else {
                res.send("User not found")
            }
        } else {
            res.send("Empty Field")
        }

    } catch (error) {
        res.send(error.message)
        res.status(500);
    }
}


async function getuser(req , res){
    let id = req.id;
    console.log(id);
    let user = await userModel.findOne({id});
    console.log(user);
    console.log("get user called");
    res.json({
        message : user
    });
}

function logout(req , res){
    res.cookie('login','',{maxAge:1})
    res.status(301).redirect("/");
    res.json({
        message:'logged out success '
    })
}


module.exports = {
    signupUser,
    loginUser,
    getuser,
    logout
}

