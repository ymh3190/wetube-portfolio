import passport from "passport";
import GitHubStrategy from "passport-github";
import FaceBookStrategy from "passport-facebook";
import InstagramStrategy from "passport-instagram";
import routes from "./routes";
import User from "./models/User";
import {
  facebookSigninCallback,
  githubSigninCallback,
  instagramSigninCallback,
} from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.githubCallback}`,
    },
    githubSigninCallback
  )
);

passport.use(
  new FaceBookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.facebookCallback}`,
      profileFields: ["id", "email", "name", "picture"],
      scope: ["public_profile", "email"],
    },
    facebookSigninCallback
  )
);

passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.IG_ID,
      clientSecret: process.env.IG_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.instagramCallback}`,
    },
    instagramSigninCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
