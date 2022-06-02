const express = require("express");
const { getNotes, createNote, deleteNote, getNote, updateNote } = require("../controllers/note");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router
  .get('/', protect, getNotes)
  .post('/create', protect, createNote)
  .get('/:id', protect, getNote)
  .put('/:id', protect, updateNote)
  .delete('/:id', protect, deleteNote);


module.exports = router;