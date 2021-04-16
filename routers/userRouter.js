import express from "express";
import {
  changePassword,
  editProfile,
  getUserDetail,
  postUserDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), getUserDetail);
userRouter.post(routes.userDetail(), uploadAvatar, postUserDetail);

userRouter.get(routes.editProfile(), onlyPrivate, editProfile);
userRouter.get(routes.changePassword(), onlyPrivate, changePassword);

export default userRouter;
