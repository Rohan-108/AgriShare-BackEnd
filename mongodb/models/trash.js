import mongoose from "mongoose";
const TrashSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: { type: String, required: true },
    tags: [String],
    price: { type: String, required: true },
    selectedFile: String,
  },
  { timestamps: true }
);

const trashModel = mongoose.model("Trash", TrashSchema);
export default trashModel;
