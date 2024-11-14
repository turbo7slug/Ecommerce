const jwt = require("jsonwebtoken")
const secret_key = "secretkey";

const generateRefreshToken = (id) =>{
    return jwt.sign({id}, secret_key, {expiresIn : "3d"})
};

module.exports = { generateRefreshToken }