const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry } = require("../controller/enqController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.get("/getEnquiry", authMiddleware, isAdmin , getAllEnquiry);
router.get("/:id", authMiddleware, isAdmin ,getEnquiry);
router.put("/:id", authMiddleware, isAdmin ,updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin ,deleteEnquiry);

module.exports = router;