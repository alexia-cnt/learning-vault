const Section = require("../models/section.model");
const Board = require("../models/board.model");


exports.createSection = async (req, res) => {
  try {
    const { title, description, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "Requiere el id del título y el tablero" })
    }

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Tablero no encontrado" })
    }

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const section = await Section.create({
      title,
      description,
      board: boardId,
    })

    res.status(201).json(section);

  } 
  catch (error) {
    res.status(500).json({ message: "Error al crear la sección", error })
  }
};


exports.getSectionsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Tablero no encontrado" })
    }

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const sections = await Section.find({ board: boardId })
      .populate("board", "title")
      .sort({ createdAt: -1 })
      
    res.json(sections);

  } 
  catch (error) {
    res.status(500).json({ message: "Error al obtener las secciones", error })
  }
};


exports.updateSection = async (req, res) => {
  try {
    const {id} = req.params;

    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({ message: "Sección no encontrada" })
    }

    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const updated = await Section.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } 
  catch (error) {
    res.status(500).json({ message: "Error actualizando la sección", error })
  }
};


exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({ message: "Sección no encontrada" })
    }

    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    await Section.findByIdAndDelete(id);

    res.json({ message: "Sección eliminada correctamente" })

  } 
  catch (error) {
    res.status(500).json({ message: "Error eliminando sección", error })
  }
};