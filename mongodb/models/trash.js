import mongoose from "mongoose";
const TrashSchema = new mongoose.Schema(
  {
    desp: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

const trashModel = mongoose.model("Trash", TrashSchema);
export default trashModel;
