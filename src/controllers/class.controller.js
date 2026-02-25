const Class = require("../models/class.model");
const Section = require("../models/section.model");
const Board = require("../models/board.model");


exports.createClass = async (req, res) => {
  try {
    const { title, description, sectionId } = req.body;

    if (!title || !sectionId) {
      return res.status(400).json({ message: "Requiere el ID del titulo y la sección" })
    }

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({ message: "Sección no encontrada" })
    }

    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const newClass = await Class.create({
      title,
      description,
      section: sectionId,
    });

    res.status(201).json(newClass);

  } 
  catch (error) {
    res.status(500).json({ message: "Error al crear la clase", error })
  }
};


exports.getClassesBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({ message: "Sección no econtrada" })
    }

    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const classes = await Class.find({ section: sectionId })
      .sort({ createdAt: -1 })

    res.json(classes);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener las clases", error })
  }
};


exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      return res.status(404).json({ message: "Clase no encontrada" })
    }

    const section = await Section.findById(existingClass.section);
    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const updated = await Class.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } 
  catch (error) {
    res.status(500).json({ message: "Error al actualizar la clase", error })
  }
};


exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      return res.status(404).json({ message: "Clase no encontrada" })
    }

    const section = await Section.findById(existingClass.section);
    const board = await Board.findById(section.board);

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    await Class.findByIdAndDelete(id);

    res.json({ message: "Clase eliminada" });

  } 
  catch (error) {
    res.status(500).json({ message: "Error al eliminar la clase", error })
  }
};