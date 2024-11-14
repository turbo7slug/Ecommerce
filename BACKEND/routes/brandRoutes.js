const express = require("express");
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand } = require("../controller/brandController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin ,createBrand);
router.get("/getBrand", authMiddleware, isAdmin , getAllBrand);
router.put("/:id", authMiddleware, isAdmin ,updateBrand);
router.delete("/:id", authMiddleware, isAdmin ,deleteBrand);
router.get("/:id", authMiddleware, isAdmin ,getBrand);

module.exports = router;