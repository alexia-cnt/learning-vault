const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, classController.createClass);
router.get("/:sectionId", authMiddleware, classController.getClassesBySection);
router.put("/:id", authMiddleware, classController.updateClass);
router.delete("/:id", authMiddleware, classController.deleteClass);

module.exports = router;