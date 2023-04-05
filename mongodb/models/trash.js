import mongoose from "mongoose";
const TrashSchema = new mongoose.Schema(
  {
    title: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
  },
  { timestamps: true }
);

const trashModel = mongoose.model("Trash", TrashSchema);
export default trashModel;
