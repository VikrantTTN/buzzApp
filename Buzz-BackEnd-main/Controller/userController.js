const userModel = require('../userModel/userModel');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const JWT_KEY = "kmwnwiniei322in7377342dcd3";

const client = new OAuth2Client(process.env.CLIENT_ID);

async function signupUser(req, res) {

    try {
        const { name, email, password, confirmPassword } = req.body;
        let user = {
            name,
            email,
            password,
            confirmPassword,
        }
        const existingUser = await userModel.findOne({ email });
        let userObj;
        if (existingUser?.googleId && !(existingUser.password && existingUser.confirmPassword)) {
            userObj = await userModel.updateOne({ email }, { name, password, confirmPassword })
        } else {
            userObj = await userModel.create(user);
        }
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

async function googleSignIn(req, res) {
    try {
        const { token } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const { name, email, sub } = ticket.getPayload();
        await userModel.findOneAndUpdate({ email }, { name, googleId: sub });
        return res.status(201).json({ name, email, googleId: sub });
    } catch (error) {
        console.log('Error occurred', error);
        res.send(error.message)
        res.status(500);
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
    googleSignIn,
    getuser,
    logout
}

