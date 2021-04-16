import routes from "../routes";
import Comment from "../models/Comment";
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

export const getVideoDetail = async (req, res) => {
  // Render videoDetail.pug
  const {
    params: { userId },
    user,
  } = req;
  try {
    if (user.id === userId) {
      let videos = [];
      videos = await Video.find({ creator: user.id });
      res.render("videoDetail", { pageTitle: "Video detail", user, videos });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postVideoDetail = async (req, res) => {
  const {
    params: { userId, videoId },
    user,
    body: { title, description },
  } = req;
  try {
    if (user.id === userId) {
      await Video.findOneAndUpdate({ _id: videoId }, { title, description });
      res.redirect(routes.videoDetail(userId, videoId));
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getWatchVideo = async (req, res) => {
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
export const postWatchVideo = async (req, res) => {
  // Render watchVideo.pug
  const {
    params: { id },
    user,
    body: { comment },
  } = req;
  try {
    if (user.id) {
      const video = await Video.findById(id)
        .populate("creator")
        .populate("comments");
      const newComment = await Comment.create({
        content: comment,
        creatorId: user.id,
        creatorAvatar: user.avatarUrl,
      });
      video.comments.push(newComment.id);
      video.save();
      res.render("watchVideo", { pageTitle: "Watch video", video });
    } else {
      res.redirect(routes.signin);
    }
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
    res.redirect(routes.userDetail(id));
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  }
};

export const editVideo = async (req, res) => {
  // Render editVideo.pug
};

export const deleteVideo = async (req, res) => {
  // Delete video
  // TODO: implements deleting video
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const videoCreator = video.creator.toString();
    if (user.id === videoCreator) {
      await Video.findOneAndDelete({ _id: video.id });
      res.redirect(routes.videoDetail(video.creator));
    } else {
      res.status(400);
      return Error();
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.videoDetail(user.id));
  }
};

export const yourVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const videos = await Video.find({ creator: id });
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
