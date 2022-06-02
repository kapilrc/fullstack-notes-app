const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const isNoteExist = await Note.findOne({
    title,
    user: req.user.id,
  });

  if (!title || !content || !category) {
    return res.status(400).json({
      message: 'Please provide all required fields'
    });
  }
  if (isNoteExist) {
    return res.status(400).json({
      message: `Note with title - '${title}' already exist`
    });
  }

  const note = new Note({
    userId: req.user._id,
    title,
    content,
    category
  });

  const newNote = await note.save();
  res.status(201).json(newNote);
});

const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(400).json({ message: "Note not found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  console.log("PUT note", note);
  if (note) {
    const { title, content, category } = req.body;

    if (note.userId.toString() !== req.user._id.toString()) {
      throw new Error('You are not authorized to update this note');
    }
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (category) {
      note.category = category;
    }
    await note.save();
    res.json(note);
  } else {
    res.status(400).json({ message: "Note not found" });
  }

});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    console.log(note.userId, req.user._id);

    if (note.userId.toString() !== req.user._id.toString()) {
      throw new Error('You are not authorized to delete this note');
    }

    await note.remove();
    res.json({
      message: 'Note deleted successfully'
    });
  } else {
    res.status(400).json({ message: "Note not found" });
  }
});

module.exports = { getNotes, createNote, getNote, updateNote, deleteNote };