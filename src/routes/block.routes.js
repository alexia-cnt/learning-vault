const express = require("express");
const router = express.Router();
const blockController = require("../controllers/block.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, blockController.createBlock);
router.get("/:classId", authMiddleware, blockController.getBlocksByClass);
router.delete("/:id", authMiddleware, blockController.deleteBlock);

module.exports = router;