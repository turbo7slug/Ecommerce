const express = require("express");
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getCoupon } = require("../controller/couponContoller");

router.post("/", authMiddleware,isAdmin,createCoupon);
router.get("/", authMiddleware,isAdmin,getAllCoupon);
router.get("/:id", authMiddleware, isAdmin, getCoupon);
router.put("/:id", authMiddleware,isAdmin,updateCoupon);
router.delete("/:id", authMiddleware,isAdmin,deleteCoupon);

module.exports = router;