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
        avatarUrl: "",
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

export const githubSignin =
  // step 1. Authenticate Github
  passport.authenticate("github");
export const postGithubSignin = (req, res) => {
  //  step 2. If success authentication, redirect home
  res.redirect(routes.home);
};
export const githubSigninCallback = async (_, __, profile, cb) => {
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
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.avatarUrl = avatarUrl;
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

export const facebookSignin = passport.authenticate("facebook");
export const postFacebookSignin = (req, res) => {
  res.redirect(routes.home);
};
export const facebookSigninCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, last_name: lastName, first_name: firstName, picture },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.avatarUrl = picture.data.url;
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

export const instagramSignin = passport.authenticate("instagram");
export const postInstagramSignin = (req, res) => {
  res.redirect(routes.home);
};
export const instagramSigninCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, last_name: lastName, first_name: firstName, picture },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.instagramId = id;
      user.firstName = firstName;
      user.lastName = lastName;
      user.avatarUrl = picture.data.url;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        instagramId: id,
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

export const userDetail = async (req, res) => {
  // Render userDetail.pug
  const {
    params: { id },
    user: signinUser,
  } = req;
  try {
    const user = await User.findById(id);
    if (signinUser.id === user.id) {
      res.render("userDetail", { pageTitle: "User Detail", user });
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => {
  // Render editProfile.pug
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const changePassword = (req, res) => {
  // Render changePassword.pug
  res.render("changePassword", { pageTitle: "Change Password" });
};
