import express from "express";
import {
  logout,
  getSignin,
  postSignin,
  getSignup,
  postSignup,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.signup, getSignup);
globalRouter.post(routes.signup, postSignup);

globalRouter.get(routes.signin, getSignin);
globalRouter.post(routes.signin, postSignin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
