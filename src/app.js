require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);


const boardRoutes = require("./routes/board.routes");
app.use("/api/boards", boardRoutes);


const sectionRoutes = require("./routes/section.routes");
app.use("/api/sections", sectionRoutes);


const classRoutes = require("./routes/class.routes");
app.use("/api/classes", classRoutes);


const blockRoutes = require("./routes/block.routes");
app.use("/api/blocks", blockRoutes);


const searchRoutes = require("./routes/search");
app.use("/api/search", searchRoutes);


app.use(require("./middleware/error.middleware"));



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});