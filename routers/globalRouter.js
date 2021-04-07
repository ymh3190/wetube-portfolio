import express from "express";
import passport from "passport";
import {
  logout,
  getSignin,
  postSignin,
  getSignup,
  postSignup,
  gitHubSignin,
  postGitHubSignin,
  faceBookSignin,
  postFaceBookSignin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(
  /*
    when access home route, call home function
    routes.home: routes.js
    home: videoController.js
  */
  routes.home,
  home
);
globalRouter.get(
  /*
    when access search route, cal search function
    routes.search: routes.js
    search: videoController.js
  */
  routes.search,
  search
);

globalRouter.get(
  /*
    when access signup route, call getSignup function
    routes.signup: routes.js
    getSignup: userController.js
  */
  routes.signup,
  onlyPublic,
  getSignup
);
globalRouter.post(
  /*
    when transfer data to signup route, call postSignup middleware, and then call postSignin function
    routes.signup: routes
    postSignup: userController.js
    postSignin: userController.js
  */
  routes.signup,
  onlyPublic,
  postSignup,
  postSignin
);

globalRouter.get(routes.signin, onlyPublic, getSignin);
globalRouter.post(routes.signin, onlyPublic, postSignin);

globalRouter.get(routes.gitHub, gitHubSignin);
globalRouter.get(
  routes.gitHubCallback,
  passport.authenticate("github", {
    failureRedirect: routes.signin,
  }),
  postGitHubSignin
);

globalRouter.get(routes.faceBook, faceBookSignin);
globalRouter.get(
  routes.faceBookCallback,
  passport.authenticate("facebook", {
    failureRedirect: routes.signin,
  }),
  postFaceBookSignin
);

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
