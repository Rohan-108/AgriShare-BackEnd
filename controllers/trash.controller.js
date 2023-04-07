import Trash from "../mongodb/models/trash.js";
import mongoose from "mongoose";

export const getAllTrash = async (req, res) => {
  try {
    const trashs = await Trash.find({}).sort({ createdAt: -1 });
    res.status(200).json(trashs);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const createTrash = async (req, res) => {
  const trash = req.body;
  const newTrash = new Trash({ ...trash, creator: req.user._id });
  try {
    await newTrash.save();
    res.status(201).json(newTrash);
  } catch (error) {
    res.status(409).json({ message: "something went wrong" });
  }
};
export const getOneTrash = async (req, res) => {
  try {
    const trash = await Trash.findById(req.params.id).populate("creator");
    res.status(200).json(trash);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteTrash = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    await Trash.findByIdAndDelete(id);
    return res.status(200).json({ message: "item deleted" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const updateTrash = async (req, res) => {
  const { id } = req.params;
  const trash = req.body;
  console.log(trash);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    const updatedTrash = await Trash.findByIdAndUpdate(
      id,
      { trash },
      {
        new: true,
      }
    );
    res.status(200).json(updatedTrash);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await Trash.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
