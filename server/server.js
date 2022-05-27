const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

// to be able to access the body in express
app.use(express.json());
app.use(cors());

// Routers

app.get("/api/", (req, res) => {
  res.send("hello world");
});

const notesRouter = require("./routes/Notes");
app.use("/api/notes", notesRouter);


// Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server running on port ${PORT}`));

