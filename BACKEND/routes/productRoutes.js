const express = require("express");
const {createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating} = require("../controller/productController");
const router = express.Router();
const {isAdmin, authMiddleware} = require("../middleware/authMiddleware");

router.post("/",authMiddleware,isAdmin, createProduct)

router.put("/wishlist", authMiddleware,addToWishList);
router.get("/:id", getAProduct);
router.get("/", getAllProduct);
router.put("/rating", authMiddleware,rating);

router.put("/update/:id",authMiddleware,isAdmin, updateProduct);
router.delete("/delete/:id",authMiddleware,isAdmin, deleteProduct)


module.exports = router;