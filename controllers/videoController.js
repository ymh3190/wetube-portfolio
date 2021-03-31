import routes from "../routes";
import Video from "../models/Video";
import { getVideoById } from "../middlewares";

export const home = async (req, res) => {
  // Render home.pug
  let videos = [];
  try {
    videos = await Video.find({});
  } catch (error) {
    console.log(error);
  }
  res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  // Render search.pug
  const {
    query: { search_query },
  } = req;
  res.render("search", { search_query });
};

export const videoDetail = async (req, res) => {
  // Render videoDetail.pug
  const {
    params: { id },
  } = req;
  const video = await getVideoById(id);
  res.render("videoDetail", { pageTitle: "Video detail", video });
};

export const watchVideo = async (req, res) => {
  // Render watchVideo.pug
  const {
    params: { id },
  } = req;
  const video = await getVideoById(id);
  res.render("watchVideo", { pageTitle: "Watch video", video });
};

export const getUploadVideo = (req, res) =>
  // Render uploadVideo.pug
  res.render("uploadVideo", { pageTitle: "Upload video" });

export const postUploadVideo = async (req, res) => {
  // Upload video and redirect videoDetail
  const {
    body: { title, description },
    file: { path },
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
    });
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
  const video = await getVideoById(id);
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
