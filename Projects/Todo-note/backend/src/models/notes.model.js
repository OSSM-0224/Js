import mongoose, { mongo } from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;
