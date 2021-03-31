import express from "express";
import {
  deleteVideo,
  editVideo,
  getUploadVideo,
  postUploadVideo,
  videoDetail,
  watchVideo,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.uploadVideo, getUploadVideo);
videoRouter.post(routes.uploadVideo, uploadVideo, postUploadVideo);

videoRouter.get(routes.watchVideo(), watchVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), editVideo);
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
