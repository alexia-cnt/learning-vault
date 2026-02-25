const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, boardController.createBoard);
router.get("/", authMiddleware, boardController.getMyBoards);
router.put("/:id", authMiddleware, boardController.updateBoard);
router.delete("/:id", authMiddleware, boardController.deleteBoard);

module.exports = router;