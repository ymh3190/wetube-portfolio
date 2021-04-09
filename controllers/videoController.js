import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import { tryCatchVideo } from "../middlewares";

export const home = async (req, res) => {
  // Render home.pug
  let videos = [];
  try {
    videos = await Video.find({}).populate("creator");
  } catch (error) {
    console.log(error);
  }
  res.render("home", { pageTitle: "Home", videos });
};

export const search = async (req, res) => {
  // Render search.pug
  const {
    query: { word },
  } = req;
  let videos = [];
  try {
    if (word) {
      videos = await Video.find({ title: { $regex: word, $options: "i" } });
      res.render("search", { pageTitle: "Search", word, videos });
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
  }
};

export const videoDetail = async (req, res) => {
  // Render videoDetail.pug
  const {
    params: { id },
  } = req;
  const video = await tryCatchVideo(id);
  res.render("videoDetail", { pageTitle: "Video detail", video });
};

export const watchVideo = async (req, res) => {
  // Render watchVideo.pug
  const {
    params: { id },
  } = req;
  let video = [];
  try {
    video = await Video.findById(id).populate("creator").populate("comments");
    res.render("watchVideo", { pageTitle: "Watch video", video });
  } catch (error) {
    console.log(error);
  }
};

export const getUploadVideo = (req, res) =>
  // Render uploadVideo.pug
  res.render("uploadVideo", { pageTitle: "Upload video" });

export const postUploadVideo = async (req, res) => {
  // Upload video and redirect videoDetail
  const {
    body: { title, description },
    file: { path },
    user: { id },
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
      creator: id,
    });
    await User.findOneAndUpdate({ id, videos: newVideo });
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    console.log(error);
  }
};

export const editVideo = async (req, res) => {
  // Render editVideo.pug
  const {
    params: { id },
  } = req;
  const video = await tryCatchVideo(id);
  res.render("editVideo", { pageTitle: "editVideo", video });
};

export const deleteVideo = async (req, res) => {
  // Delete video
  // TODO: implements deleting video
  const {
    params: { id },
  } = req;
  await Video.findOneAndRemove({ _id: id });
  await Video.save();
  res.redirect(routes.videoDetail(id));
};
