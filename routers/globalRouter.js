import express from "express";
import { logout, serviceLogin, signup } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.signup, signup);
globalRouter.get(routes.serviceLogin, serviceLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
