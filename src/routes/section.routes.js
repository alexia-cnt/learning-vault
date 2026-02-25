const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/section.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, sectionController.createSection);
router.get("/:boardId", authMiddleware, sectionController.getSectionsByBoard);
router.put("/:id", authMiddleware, sectionController.updateSection);
router.delete("/:id", authMiddleware, sectionController.deleteSection);

module.exports = router;