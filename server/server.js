const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require('path');

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

app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

// ------------- deployment -------------

__dirname = path.resolve();
console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })

} else {
  app.get("/api/", (req, res) => {
    res.send("hello world");
  });
}




// ------------- deployment -------------

// use error handler middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server running on port ${PORT}`));

