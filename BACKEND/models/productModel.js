const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    slug : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        // select : false
    },
    images : [{
        public_id : String,
        url : String
    }],
    color : [{type : mongoose.Schema.Types.ObjectId,
            ref : "Color"            
    }],
    tags : {
        type : String,
    },
    ratings : [{
        star : Number,
        comment : {
            type : String
        },
        postedby : { type : mongoose.Schema.Types.ObjectId, ref : "User"}
    }],
    totalrating: {
        type: String,
        default : 0,
    },
    brand : {
        type : String,
        required : true
        // enum : ["Apple", "Samsung", "One Plus"]
    },
    sold :{
        type : Number,
        default : 0,
        // select : false we use this to hide this field from showing it to users
    }
}, {
    timestamps : true
})


module.exports = mongoose.model("Product", productSchema);