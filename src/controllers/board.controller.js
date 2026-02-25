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
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tablero", error })
  }
};


exports.getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id })

    res.json(boards)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tableros", error })
  }
};