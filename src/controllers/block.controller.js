const Block = require("../models/block.model");
const Class = require("../models/class.model");
const Section = require("../models/section.model");
const Board = require("../models/board.model");

exports.createBlock = async (req, res) => {
  try {
    const { type, content, classId } = req.body;

    if (!type || !content || !classId) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    const section = await Section.findById(classItem.section);
    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const block = await Block.create({
      type,
      content,
      class: classId,
    });

    res.status(201).json(block);

  } catch (error) {
    res.status(500).json({ message: "Error creando bloque", error });
  }
};

exports.getBlocksByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const blocks = await Block.find({ class: classId })
      .sort({ createdAt: 1 });

    res.json(blocks);

  } catch (error) {
    res.status(500).json({ message: "Error obteniendo bloques", error });
  }
};

exports.deleteBlock = async (req, res) => {
  try {
    const { id } = req.params;

    await Block.findByIdAndDelete(id);

    res.json({ message: "Bloque eliminado" });

  } catch (error) {
    res.status(500).json({ message: "Error eliminando bloque", error });
  }
};