const Board = require("../models/board.model");


exports.createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;

    const board = await Board.create({
      title,
      description,
      user: req.user._id,
    })

    res.status(201).json(board)
  } 
  catch (error) {
    res.status(500).json({ message: "Error al crear el tablero", error })
  }
};


exports.getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id })

    res.json(boards)
  } 
  catch (error) {
    res.status(500).json({ message: "Error al obtener los tableros", error })
  }
};


exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).json({ message: "Tablero no encontrado" })
    }

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    const updated = await Board.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } 
  catch (error) {
    res.status(500).json({ message: "Error actualizando tablero", error });
  }
};


exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).json({ message: "Tablero no encontrado" })
    }

    if (board.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No autorizado" })
    }

    await Board.findByIdAndDelete(id);

    res.json({ message: "Tablero eliminado correctamente" })

  } 
  catch (error) {
    res.status(500).json({ message: "Error eliminando tablero", error });
  }
};