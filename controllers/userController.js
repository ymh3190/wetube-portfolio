import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getSignup = (req, res) => {
  // Render signup.pug
  res.render("signup", { pageTitle: "Sign Up" });
};
export const postSignup = async (req, res, next) => {
  // Render signup.pug
  const {
    body: { firstName, lastName, email, password, confirmPassword },
  } = req;
  if (password === confirmPassword) {
    try {
      const user = await User({
        firstName,
        lastName,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400);
    console.log("Password Error");
    res.render("signup", { pageTitle: "Sign Up" });
  }
};

export const getSignin = (req, res) => {
  // Render signin.pug
  res.render("signin", { pageTitle: "Sign In" });
};
export const postSignin = passport.authenticate("local", {
  // If login redirect home, if not redirect routes.signin
  successRedirect: routes.home,
  failureRedirect: routes.signin,
});

export const gitHubSignin =
  // step 1. Authenticate Github
  passport.authenticate("github");
export const postGitHubSignin = (req, res) => {
  //  step 2. If success authentication, redirect home
  res.redirect(routes.home);
};
export const gitHubSigninCallback = async (_, __, profile, cb) => {
  /*
    step 3. Include information about github
    _: accessToken
    __: refreshToken
    profile: information
    cb: callback function. if success authentication, and then call this function
    return: cb function
  */
  const {
    _json: { id, avatar_url: avatarUrl, email, name },
  } = profile;
  try {
    const user = await User.findOne({ email });
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    if (user) {
      user.githubId = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        avatarUrl,
        firstName,
        lastName,
        githubId: id,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const faceBookSignin = passport.authenticate("facebook", {
  scope: ["email"],
});
export const postFaceBookSignin = (req, res) => {
  res.redirect(routes.home);
};
export const faceBookSigninCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, first_name: firstName, last_name: lastName, picture },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        facebookId: id,
        email,
        firstName,
        lastName,
        avatarUrl: picture.data.url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const logout = (req, res) => {
  // Log out and then redirect home
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) => {
  // Render userDetail.pug
  res.render("userDetail", { pageTitle: "User Detail" });
};

export const editProfile = (req, res) => {
  // Render editProfile.pug
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const changePassword = (req, res) => {
  // Render changePassword.pug
  res.render("changePassword", { pageTitle: "Change Password" });
};
