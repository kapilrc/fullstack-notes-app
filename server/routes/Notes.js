const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Day 1 of college",
      content:
        "I made a few new friends and introduced myself to a lot of new teachers.",
      category: "College",
    }]);
});


module.exports = router;