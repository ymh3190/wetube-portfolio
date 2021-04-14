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
    user,
  } = req;
  try {
    const video = Video.findById(id);
    if (user.id === toString(video.creator)) {
      res.render("videoDetail", { pageTitle: "Video detail", video });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const watchVideo = async (req, res) => {
  // Render watchVideo.pug
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("watchVideo", { pageTitle: "Watch video", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
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
    res.redirect(routes.userDetail(id));
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
    user,
  } = req;
  try {
    const video = Video.findById(id);
    if (user.id === toString(video.creator)) {
      await Video.findOneAndRemove({ id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const yourVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const videos = await Video.find({ creator: id }).populate("creator");
  res.render("yourVideo", { pageTitle: "Your videos", videos });
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
