const jwt = require("jsonwebtoken")
const secret_key = "secretkey";

const generateToken = (id) =>{
    return jwt.sign({id}, secret_key, {expiresIn : "1d"})
};

module.exports = { generateToken }