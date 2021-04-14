import express from "express";
import {
  deleteVideo,
  editVideo,
  getUploadVideo,
  postUploadVideo,
  videoDetail,
  watchVideo,
  yourVideo,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.uploadVideo, onlyPrivate, getUploadVideo);
videoRouter.post(routes.uploadVideo, onlyPrivate, uploadVideo, postUploadVideo);

videoRouter.get(routes.watchVideo(), watchVideo);

videoRouter.get(routes.yourVideo(), yourVideo);

videoRouter.get(routes.videoDetail(), onlyPrivate, videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, editVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
