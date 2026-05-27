import express from "express";
import NoteModel from "./models/notes.model.js";

const app = express();
app.use(express.json());
// @route POST /api/notes
// @Create Create a new note need title and description in the request body
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

export default app;
