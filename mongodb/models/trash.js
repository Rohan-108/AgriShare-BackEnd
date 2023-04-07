import mongoose from "mongoose";
const TrashSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: { type: String, required: true },
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
