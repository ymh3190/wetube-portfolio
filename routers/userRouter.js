import express from "express";
import { getUserDetail, postUserDetail } from "../controllers/userController";
import { uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), getUserDetail);
userRouter.post(routes.userDetail(), uploadAvatar, postUserDetail);

export default userRouter;
