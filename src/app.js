require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "API running" });
});


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const boardRoutes = require("./routes/board.routes");
app.use("/api/boards", boardRoutes);


const sectionRoutes = require("./routes/section.routes");
app.use("/api/sections", sectionRoutes);


const classRoutes = require("./routes/class.routes");
app.use("/api/classes", classRoutes);


app.use("/api/auth", authRoutes);