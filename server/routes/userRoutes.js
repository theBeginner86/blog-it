const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
const { authenticateToken, generateAccessToken } = require('../utils/authenticateToken');


const router = express.Router();

router.post("/signup", async (req, res)=> {
    const {
        firstName,
        lastName,
        password
    } = req.body;

    const email = req.body.email.toLowerCase();

    if(!firstName){
        return res.send({
            success: false,
            message: "Error: First Name field cannot be empty"
        });
    }

    if(!lastName){
        return res.send({
            success: false,
            message: "Error: Last Name field cannot be empty"
        });
    }

    if(!email){
        return res.send({
            success: false,
            message: "Error: Email field cannot be empty"
        });
    }

    if(!password){
        return res.send({
            success: false,
            message: "Error: Password field cannot be empty"
        });
    }

    User.find({
        email: email
    }, (err, existingUser) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server Error"
            });
        } else if (existingUser.length > 0) {
            return res.send({
                success: false,
                message: "Error: Email already exists"
            });
        }
        
        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = password;

        newUser.save((err, response) => {
            if(err){
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            };
            console.log(response);
            return res.send({
                success: true,
                message: "User Sign up successfully"
            });
        });

    });
});

router.post("/signin", async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if(!email){
        return res.send({
            success: false,
            message: "Error: Email field cannot be empty"
        });
    }

    if(!password){
        return res.send({
            success: false,
            message: "Error: Password field cannot be empty"
        });
    }

    User.find({
        email: email,
    }, async (err, users) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server Error"
            });
        } else if(users.length != 1){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        const user = users[0];
        const passwordPromise = await bcrypt.compare(password, user.password);
        
        console.log(passwordPromise);
        if(!passwordPromise){
            return res.send({
                success: false,
                message: "Error: Invalid Password"
            });
        }

        console.log({user});

        const accessToken = generateAccessToken(user);
        // const refershToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET); future addition
        res.json({
            success: true,
            accessToken: accessToken,
            // refershToken: refershToken  future addition
        });

    });
    
});

router.post("/verify/user", authenticateToken, (req, res) => {
    const user = req.user;
    console.log(user);
    console.log("user verified...");
    return res.send({
        success: true,
        user: user.user
    });
});

// router.get("/token", (req, res) => {         future addition
//     const refereshToken = req.body.token;
//     if(refereshToken == null) return res.send({
//         success: false,
//         message: "Error: Invalid refersh token"
//     })
// })


module.exports = router;