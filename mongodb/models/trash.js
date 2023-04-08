import mongoose from "mongoose";
const TrashSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdby: { type: String, required: true },
    location: { type: String, required: true },
    number: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://images.pexels.com/photos/1730341/pexels-photo-1730341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

const trashModel = mongoose.model("Request", TrashSchema);
export default trashModel;
