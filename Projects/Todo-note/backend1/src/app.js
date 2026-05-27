import express from "express";
import NoteModel from "./models/list.model.js";

const app = express();

app.use(express.json());
// @route POST /api/notes
// @description Create a new note need title and description in the request body
// @access Public

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  //   ----VALIDATION-----
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title AND Description are required" });
  }
  if (title.trim().length < 4) {
    return res.status(400).json({ error: "Title has to be 4 letters " });
  }
  if (description.trim().length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 characters long" });
  }

  const newNote = await NoteModel.create({ title, description });
  return res.json({ message: "Note Created sucessfully", newNote });
});
// @route GET /api/get-notes
// @description Fetching all the notes
// @access Public
app.get("/api/get-notes", async (req, res) => {
  const getNote = await NoteModel.find();

  return res.status(200).json({
    message: "Noted Fetched sucessfully",
    getNote,
  });
});
// @route PATCH /api/update-note/:noteId
// @description updating a note by id require description in the request body
// @access Public
app.patch("/api/update-note/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  if (!description) {
    return res
      .status(400)
      .json({ error: "Title AND Description are required" });
  }
  if (description.trim().length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 characters long" });
  }
  const updateNote = await NoteModel.findById(id);

  if (!updateNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  updateNote.description = description;
  await updateNote.save();

  return res.status(200).json({
    message: "Note updated Sucessfully",
    updateNote,
  });
});

app.delete("/api/delete-note/:id", async (req, res) => {
  const { id } = req.params;
  const deleteNote = await NoteModel.findById(id);

  if (!deleteNote) {
    return res.status(404).json({
      error: "Note not found",
    });
  }

  await deleteNote.deleteOne();
  return res.status(200).json({
    message: "Note deleted Scucessfully",
  });
});
export default app;
