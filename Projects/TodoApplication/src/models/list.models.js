import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ListModel = mongoose.Schema("List", ListSchema);
export default ListModel;
