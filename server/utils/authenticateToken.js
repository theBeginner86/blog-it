const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next){
    // console.log("inside authenticate token");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.send({
        success: false,
        message: "Error: Empty Token"
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.send({
            success: false,
            message: "Error: Server Error"
        })

        req.userid = user;
        next();
    })
}

function generateAccessToken(user){
    console.log(user);
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET); // FOR NOW REMOVING {expires: '15s'}
}

module.exports = {authenticateToken, generateAccessToken};