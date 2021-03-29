import mongoose from "mongoose";

async function run() {
  const VideoSchema = new mongoose.Schema({
    file: {
      type: String,
      required: "file is required",
    },
    title: {
      type: String,
      required: "title is required",
    },
    description: String,
    views: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });

  const Video = mongoose.model("Video", VideoSchema, "Video");
  Video.watch().on("change", (data) => console.log(new Date(), data));

  console.log(new Date(), "Inserting doc");
}
