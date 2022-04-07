const express = require('express');
const cookieParser = require('cookie-parser');
const userModel = require('../userModel/userModel')
const jwt = require('jsonwebtoken');
const JWT_KEY = "kmwnwiniei322in7377342dcd3";

async function protectedRoute(req, res, next) {
    console.log(req.cookies);
    try{ 
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            console.log(payload);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                console.log("protected route called");
                //req.role = user.role;
                req.id = user._id;
                next();
            }
            else{
                return res.json({
                    message:'user not verified'
                })
            }
    
        } else {
            res.send('Not_Authorized')
        }
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports = protectedRoute; 