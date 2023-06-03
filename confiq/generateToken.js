const jwt = require('jsonwebtoken');

const generateToken = (id,password) =>{

    return jwt.sign({id,password}, process.env.JWT_SECRET,{
        expiresIn: "30d",
    });

};
module.exports = generateToken;