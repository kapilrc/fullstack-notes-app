const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const noteRouter = require("./routes/Note");
const userRouter = require("./routes/User");
const { notFound, errorHandler } = require("./middlewares/error");

const app = express();

dotenv.config();

connectDB();

// to be able to access the body in express
app.use(express.json());
app.use(cors());

// Routers

app.get("/api/", (req, res) => {
  res.send("hello world");
});

app.use("/api/notes", noteRouter);

app.use("/api/user", userRouter);

// use error handler middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server running on port ${PORT}`));

