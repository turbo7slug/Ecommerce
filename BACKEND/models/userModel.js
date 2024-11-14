const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        index : true
    },
    lastname : {
        type : String,
        required : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    mobile : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : "user"
    },
    cart : {
        type : Array,
        default : []
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    address : {
        type : String
    },
    wishlist : [{type : mongoose.Schema.Types.ObjectId , ref : "Product"}],
    refreshToken : {
        type : String,
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires : Date
}, {
    timestamps : true,
})

// userSchema.pre = Defines a pre-save middleware function that is executed before saving a user document to the database.
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30*60*1000 // This is 10 minutes
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);