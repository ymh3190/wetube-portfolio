import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: "content is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorId: String,
  creatorAvatar: String,
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
