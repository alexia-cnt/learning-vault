const express = require("express");
const router = express.Router();
const Board = require("../models/board.model.js");
const Section = require("../models/section.model.js");
const Class = require("../models/class.model.js");

router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.json({ boards: [], sections: [], classes: [] });
  }

  try {
    const boards = await Board.find({
      title: { $regex: query, $options: "i" }
    });

    const sections = await Section.find({
      title: { $regex: query, $options: "i" }
    });

    const classes = await Class.find({
      title: { $regex: query, $options: "i" }
    });

    res.json({ boards, sections, classes });
  } catch (err) {
    res.status(500).json({ error: "Error en búsqueda" });
  }
});

module.exports = router;