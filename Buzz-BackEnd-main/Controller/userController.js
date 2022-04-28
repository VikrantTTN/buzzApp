const userModel = require('../Model/userModel');
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
        const user = await userModel.findOneAndUpdate({ email }, { name, googleId: sub }, { upsert: true });
        const uid = user["_id"];
        const jwtToken = jwt.sign({ payload: uid }, JWT_KEY);
        return res.cookie('login', jwtToken).status(201).json({ name, email, googleId: sub });
    } catch (error) {
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
                    const token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie("login", token)
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


async function getuser(req, res) {
    try {
        console.log("get user called");
        let id = req.id;
        // let user = await userModel.findById(id);
        let user = req.user;
        res.json({
            message: user
        });
    } catch (err) {
        res.status(500).json(err.message)
    }
}

function logout(req, res) {
    return res
        .clearCookie("login")
        .status(200)
        .json({ message: "logged out success" });
}


module.exports = {
    signupUser,
    loginUser,
    googleSignIn,
    getuser,
    logout,
}

