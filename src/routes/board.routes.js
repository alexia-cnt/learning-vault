const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, boardController.createBoard);
router.get("/", authMiddleware, boardController.getMyBoards);

module.exports = router;