import express from "express";
import {
  deleteVideo,
  editVideo,
  getUploadVideo,
  getVideoDetail,
  getWatchVideo,
  postUploadVideo,
  postVideoDetail,
  postWatchVideo,
  yourVideo,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.uploadVideo, onlyPrivate, getUploadVideo);
videoRouter.post(routes.uploadVideo, onlyPrivate, uploadVideo, postUploadVideo);

videoRouter.get(routes.watchVideo(), getWatchVideo);
videoRouter.post(routes.watchVideo(), onlyPrivate, postWatchVideo);

videoRouter.get(routes.yourVideo(), yourVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

videoRouter.get(routes.videoDetail(), onlyPrivate, getVideoDetail);
videoRouter.post(routes.videoDetail(), onlyPrivate, postVideoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, editVideo);

export default videoRouter;
