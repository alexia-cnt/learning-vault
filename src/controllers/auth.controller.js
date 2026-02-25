const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateToken = require("../utils/jwt");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/email");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "El email ya se encuentra registrado" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error })
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Credenciales invalidas" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales invalidas" })
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login exitoso",
      token,
    })

  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error })
  }
};

