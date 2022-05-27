const express = require('express');
const app = express();

const cors = require("cors");

// to be able to access the body in express
app.use(express.json());
app.use(cors());


app.get("/api/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('server running on port ' + PORT)
});

