const express = require("express");
const router = express.Router();
const {createUser , loginUserCtrl, getAllUser, getAUser, deleteAUser, updateUser, blockUser, unblockUser, handleRefershToken, logOut, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart, createOrder, removeProductFromCart, updateProductQuantityFromCart, getMyOrders, getMonthWiseOrderIncome, getMonthWiseOrderCount, getYearlyTotalOrders, getAllOrders, getSingleOrder, updateOrder, emptyCart} = require("../controller/userController");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentController");


router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)
// router.put("/order/update-order/:id",authMiddleware, isAdmin, updateOrderStatus);

router.put("/password",authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart",authMiddleware, userCart);

router.post("/order/checkout", authMiddleware, checkout)
router.post("/order/paymentVerification",authMiddleware, paymentVerification)

// router.post("/cart/applycoupon",authMiddleware, applyCoupon);
router.get("/getMonthWiseOrderIncome",authMiddleware, getMonthWiseOrderIncome)
router.get("/getYearlyTotalOrders",authMiddleware, getYearlyTotalOrders)

router.post("/cart/create-order",authMiddleware, createOrder);


router.get("/wishlist",authMiddleware, getWishList)

router.get("/getuser", getAllUser);
// router.get("/get-orders",authMiddleware, getOrders);
router.get("/getmyorders",authMiddleware, getMyOrders);
router.get("/getallorders",authMiddleware,isAdmin, getAllOrders);
router.get("/getaOrder/:id",authMiddleware,isAdmin, getSingleOrder);
router.put("/updateOrder/:id",authMiddleware,isAdmin, updateOrder);
// router.post("/getorderbyuser/:id",authMiddleware,isAdmin, getOrderByUserId);
router.get("/refresh",handleRefershToken)
router.get("/logout",logOut)

router.get("/cart",authMiddleware, getUserCart)
router.delete("/empty-cart",authMiddleware, emptyCart)
router.delete("/delete-product-cart/:cartItemId",authMiddleware, removeProductFromCart)
router.delete("/update-product-cart/:cartItemId/:newQuantity",authMiddleware, updateProductQuantityFromCart)
router.get("/:id",authMiddleware,isAdmin, getAUser)

router.delete("/:id", deleteAUser)
router.put("/:id",authMiddleware, updateUser)
router.put("/save-address", saveAddress)

router.put("/block-user/:id",authMiddleware,isAdmin, blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser)
module.exports = router;