import passport from "passport";
import GitHubStrategy from "passport-github";
import FaceBookStrategy from "passport-facebook";
import routes from "./routes";
import User from "./models/User";
import {
  faceBookSigninCallback,
  gitHubSigninCallback,
} from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.gitHubCallback}`,
    },
    gitHubSigninCallback
  )
);

passport.use(
  new FaceBookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.faceBookCallback}`,
      profileFields: ["id", "emails", "name", "picture"],
    },
    faceBookSigninCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
