import mongoose from "mongoose";

const Note1Schema = new mongoose.Schema({
  title: String,
  description: String,
});
const Note1Model = mongoose.model("Note1", Note1Schema);
export default Note1Model;
