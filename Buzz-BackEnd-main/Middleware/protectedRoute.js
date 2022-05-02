const userModel = require('../Model/userModel')
const jwt = require('jsonwebtoken');
const JWT_KEY = "kmwnwiniei322in7377342dcd3";

async function protectedRoute(req, res, next) {
    try{ 
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
           // console.log(payload);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                console.log("protected route called");
                //console.log(user);
                //req.role = user.role;
                req.id = user._id;
                req.user =user;
                next();
            }
            else{
                return res.json({
                    message:'user not verified'
                })
            }
    
        } else {
            res.status(401)
            res.send('UnAuthorized');
        }
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports = protectedRoute; 