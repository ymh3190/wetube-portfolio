import express from "express";
import {
  deleteVideo,
  getUploadVideo,
  getVideoDetail,
  getWatchVideo,
  postUploadVideo,
  postVideoDetail,
  yourVideo,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.uploadVideo, onlyPrivate, getUploadVideo);
videoRouter.post(routes.uploadVideo, onlyPrivate, uploadVideo, postUploadVideo);

videoRouter.get(routes.watchVideo(), getWatchVideo);

videoRouter.get(routes.yourVideo(), yourVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

videoRouter.get(routes.videoDetail(), onlyPrivate, getVideoDetail);
videoRouter.post(routes.videoDetail(), onlyPrivate, postVideoDetail);

export default videoRouter;
