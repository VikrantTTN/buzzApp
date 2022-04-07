const userModel = require('../userModel/userModel');


async function signupUser(req, res) {

    try {
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
        let userObj = await userModel.create(user);
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
    loginUser
}

