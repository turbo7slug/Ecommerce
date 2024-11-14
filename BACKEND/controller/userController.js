const uniqid = require("uniqid");

const { generateToken } = require("../config/jwtToken");
const mongoose = require("mongoose");
const crypto = require("crypto")
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel")
const Order = require("../models/orderModel")
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongoDb");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const { use } = require("../routes/authRoutes");
const secret_key = "secretkey";

// Create a user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    // Checking if a user is already exist or not
    const findUser = await User.findOne({ email: email });


    if (!findUser) {
        // Create a new user
        const newUser = await User.create(req.body);
        res.send(newUser);
    }
    else {
        throw new Error("User already exist........")
    }
})

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exist or not
    const findUser = await User.findOne({ email: email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, {
            new: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findUser?.id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    }
    else {
        throw new Error("Invalid credentials")
    }

})

// Admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exist or not
    const findAdmin = await User.findOne({ email: email })
    if (findAdmin.role !== "admin") throw new Error("Not authorizsed");
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateUser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken
        }, {
            new: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findAdmin?.id,
            firstname: findAdmin?.firstName,
            lastname: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id)
        })
    }
    else {
        throw new Error("Invalid credentials")
    }

})


// Handle refresh token
const handleRefershToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refresh token present in db or not matched");
    jwt.verify(refreshToken, secret_key, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token")
        }
        const accessToken = generateToken(user?._id);
        res.json(accessToken);
    })
})

// const cookie = CookieExtractor(req);
// const refeshCookie = req.cookies["refeshToken"];
// console.log('refeshCookie',refeshCookie)
// if(!refeshCookie){
//     return res.status(401).send({msg:"You are not logged in"});
//     }else{
//         const user = await User.findByCredentials(cookie.email, cookie.password);
//         if (!user) {
//             throw new Error();
//             }
//             const newRefreshToken = await generateRefreshToken(user?._id);
//             await User.updateOne({_id : user._id},{$set:{refreshToken : newRefreshToken}})
//             res.clearCookie("refeshToken");
//             res.cookie("refeshToken",newRefreshToken,{httpOnly :true,maxAge : 72 * 60
//                 * 60 * 1000})
//                 res.json({token : generateToken(user._id)})
//                 }

// Logout the user
const logOut = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        if (!refreshToken) throw new Error("No refresh token found");
        const user = await User.findOne({ refreshToken });
        // if(!user) throw new Error("User not found");
        if (!user) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });
            return res.status(204) // forbidden
        }
        // await User.updateOne({ _id: user._id }, {$unset: { refreshToken: "" }});
        await User.findOneAndUpdate({ refreshToken: refreshToken }, {
            refreshToken: "",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204)
        // res.clearCookie("refreshToken");
        // res.json({ msg: "Logged out successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
})

// Updata a user
const updateUser = asyncHandler(async (req, res) => {
    const {_id } = req.user;
    validateMongoDbId(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(_id,{
            firstname : req?.body?.firstname,
            lastname : req?.body?.lastname,
            email : req?.body?.email,
            mobile : req?.body?.mobile
        }, {
            new: true,
        });
      res.json(updateUser)
    } catch (error) {
        throw new Error(error)
    }

})

// save user address
const saveAddress = asyncHandler(async (req, res) => {
    console.log("address")
    const { _id } = req.user;
    console.log(_id)
    validateMongoDbId(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            address : req?.body?.address
        }, {
            new: true,
        });
       res.json(updateUser);
    } catch (error) {
        throw new Error(error)
    }

})

// Get all the user
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Get a user
const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id);
    try {
        const getUser = await User.findById(id);
        if (getUser) {
            res.json(getUser)
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        throw new Error(error);
    }
})

// Delete a user
const deleteAUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id)
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (deleteUser) {
            res.json({
                msg: "User deleted successfully",
                success: true
            })
        }
        else {
            throw new Error("User not found")
        }
    } catch (error) {
        throw new Error(error);
    }
})

const blockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id)
    const { id } = req.params;
    try {
        const blockusr = await User.findByIdAndUpdate(id, {
            isBlock: true,
        }, {
            new: true,
        }
        );
        // res.json({
        //     message : "User blocked"
        // })
        res.json(blockusr)
    } catch (error) {
        throw new Error(error);
    }
})

const unblockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id)
    const { id } = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlock: false,
        }, {
            new: true,
        }
        );
        res.json({
            message: "User unblocked"
        })
    } catch (error) {
        throw new Error(error);
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
    }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found with this email")
    try {
        const token = await user.createPasswordResetToken();
        await user.save()
        const resetURL = `Hi, Please follow the link to reset Your password. This link is valid till 10 minutes from now.<a href="http://localhost:3000/reset-password/${token}">Click Here</a>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password link",
            htm: resetURL
        }
        sendEmail(data);
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    console.log(password, token)
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error("Token expired. Please try again later..")
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
})

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error)
    }
})

const userCart = asyncHandler(async(req,res)=>{
    const {productId, color, quantity, price} = req.body;
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        let newCart = await new Cart({
            userId : _id,
            productId,
            color,
            price,
            quantity
        }).save()
        res.json(newCart);
    } catch (error) {
        throw new Error(error)
    }
})

const getUserCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.find({ userId : _id }).populate("productId").populate("color")
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
});

const removeProductFromCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {cartItemId} = req.params;
    validateMongoDbId(_id);
    try {
        const deletedProduct = await Cart.deleteOne({userId : _id, _id : cartItemId})
        res.json(deletedProduct)
    } catch (error) {
        throw new Error(error);
    }
})

const updateProductQuantityFromCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {cartItemId, newQuantity} = req.params;
    validateMongoDbId(_id);
    try {
        const cartItem = await Cart.findOne({userId : _id, _id: cartItemId})
        cartItem.quantity = newQuantity;
        cartItem.save()
    } catch (error) {
        throw new Error(error);
    }

})

const getMyOrders = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    try {
        const orders = await Order.find({user : _id}).populate("user").populate("orderItems.product").populate("orderItems.color")
        res.json({
            orders
        })
    } catch (error) {
        throw new Error(error)
    }
})
const getAllOrders = asyncHandler(async(req,res)=>{
       try {
        const orders = await Order.find().populate("user")
        res.json({
            orders
        })
    } catch (error) {
        throw new Error(error)
    }
})
const getSingleOrder = asyncHandler(async(req,res)=>{
    const {id} = req.params
       try {
        const orders = await Order.findOne({_id : id}).populate("orderItems.product").populate("orderItems.color")
        res.json({
            orders
        })
    } catch (error) {
        throw new Error(error)
    }
})
const updateOrder = asyncHandler(async(req,res)=>{
    const {id} = req.params
       try {
        const orders = await Order.findById(id)
        orders.orderStatus = req.body.status;
        await orders.save()
        res.json({
            orders
        })
    } catch (error) {
        throw new Error(error)
    }
})

const emptyCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        const deleteCart = await Cart.deleteMany({userId : _id})
        res.json(deleteCart)
    } catch (error) {
        throw new Error(error)
    }
});

// const applyCoupon = asyncHandler(async(req,res)=>{
//     const {coupon} = req.body;
//     const {_id} = req.user;
//     validateMongoDbId(_id)
//     const validCoupon = await Coupon.findOne({name : coupon});
//     if(validCoupon === null){
//         throw new Error("Invalid coupon")
//     }
//     const user = await User.findOne({ _id })
//     let {products, cartTotal} = await Cart.findOne({ orderby : user._id}).populate("products.product");
//     let totalAfterDiscount = (cartTotal- (cartTotal * validCoupon.discount)/100).toFixed(2);
//     await Cart.findOneAndUpdate({ orderby: user._id }, {totalAfterDiscount}, {new : true});
//     res.json(totalAfterDiscount)
// });

const createOrder = asyncHandler(async(req,res)=>{
    const {shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo} = req.body;
    const { _id} = req.user;
    try {
        const order = await Order.create({
            shippingInfo, orderItems,totalPrice,totalPriceAfterDiscount,paymentInfo,user : _id
        })
        res.json({
            order,
            success : true
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getMonthWiseOrderIncome = asyncHandler(async(req,res)=>{
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date();
    let endDate = ""
    d.setDate(1)
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1)        
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
    }
    const data = await Order.aggregate([
        {
            $match : {
                createdAt : {
                    $lte : new Date(),
                    $gte : new Date(endDate)
                }
            }
        },{
            $group : {
                _id : {
                    month : "$month"
                },amount : {$sum : "$totalPriceAfterDiscount"},count : {$sum : 1}
            }
        }
    ])
    res.json(data)
})
const getYearlyTotalOrders = asyncHandler(async(req,res)=>{
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date();
    let endDate = ""
    d.setDate(1)
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1)        
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
    }
    const data = await Order.aggregate([
        {
            $match : {
                createdAt : {
                    $lte : new Date(),
                    $gte : new Date(endDate)
                }
            }
        },{
            $group : {
                _id : null,
                count : {$sum : 1},
                amount : {$sum : "$totalPriceAfterDiscount"}
            }
        }
    ])
    res.json(data)
})

// const createOrder = asyncHandler(async(req,res)=>{
//     const {_id} = req.user;
//     validateMongoDbId(_id)
//     const {COD, couponApplied} = req.body;
//    try {
//     if(!COD) throw new Error("Create cash order failed!");
//     const user = await User.findById(_id);
//     let userCart = await Cart.findOne({ orderby : user._id});
//     let finalAmount = 0;
//     if(couponApplied && userCart.totalAfterDiscount){
//         finalAmount = userCart.totalAfterDiscount ;
//     }else{
//         finalAmount = userCart.cartTotal ;
//     }
//     let newOrder = await new Order({
//         products : userCart.products,
//         paymentIntent : {
//             id : uniqid(),
//             method : "COD",
//             amount : finalAmount,
//             status : "Cash on Delivery",
//             created : Date.now(),
//             currency : "usd"
//         },
//         orderby : user._id,
//         orderStatus : "Cash on Delivery"
//     }).save();
//     let update = userCart.products.map((item)=>{
//         return{
//             updateOne : {
//                 filter : { _id: item.product._id },
//                 update : {$inc : { quantity : -item.count , sold : +item.count}}
//             }
//         }
//     });
//     const updated = await Product.bulkWrite(update, {});
//     res.json({message : "success"})
//    } catch (error) {
//     throw new Error(error)
//    }
// });

// const getOrders = asyncHandler(async(req,res)=>{
//     const {_id} = req.user;
//     validateMongoDbId(_id);
//     try {
//         const userOrders = await Order.findOne({ orderby: _id }).populate("products.product").populate("orderby").exec()
//         res.json(userOrders)
//     } catch (error) {
//         throw new Error(error)
//     }
// });

// const getAllOrders = asyncHandler(async(req,res)=>{
//     try {
//         const allUserOrders = await Order.find().populate("products.product").populate("orderby").exec()
//         res.json(allUserOrders)
//     } catch (error) {
//         throw new Error(error)
//     }
// });

// const getOrderByUserId = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id);
//     try {
//       const userorders = await Order.findOne({ orderby: id })
//         .populate("products.product")
//         .populate("orderby")
//         .exec();
//       res.json(userorders);
//     } catch (error) {
//       throw new Error(error);
//     }
//   });

// const updateOrderStatus = asyncHandler(async(req,res)=>{
//     const { status } = req.body;
//     const {id} = req.params;
//     validateMongoDbId(id);
//     try {
//         const updateOrderStatus = await Order.findByIdAndUpdate(
//             id,
//             {
//                 orderStatus : status,
//                 paymentIntent : {
//                     status : status,
//                 }
//             },
//             {
//                 new : true
//             }
//         );
//         res.json(updateOrderStatus)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

module.exports = { createUser, loginUserCtrl, getAllUser, getAUser, deleteAUser, updateUser, blockUser, unblockUser, handleRefershToken, logOut, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart,
    emptyCart, 
    // applyCoupon,
     createOrder,
    //   getOrders, 
    //   updateOrderStatus ,
       getAllOrders,
    //    getOrderByUserId,
       removeProductFromCart , updateProductQuantityFromCart, getMyOrders, getMonthWiseOrderIncome,getYearlyTotalOrders,getSingleOrder,updateOrder}; 
