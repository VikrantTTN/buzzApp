const userModel = require('../userModel/userModel');
const { OAuth2Client } = require('google-auth-library');

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
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password === data.password) {
                    // let uid = user["_id"];
                    // let token = jwt.sign({payload:uid},JWT_KEY);
                    // res.cookie("login" ,token)
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

module.exports = {
    signupUser,
    loginUser,
    googleSignIn,
}

