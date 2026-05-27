import mongoose from "mongoose";

const NoteSchema = new mongoose.Schmea({
  title: String,
  description: String,
});

const NoteModel = mongoose.model("Note", NoteSchema);
export default NoteModel;
