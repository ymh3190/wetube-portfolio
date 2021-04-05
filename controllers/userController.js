export const getSignup = (req, res) => {
  // Render signup.pug
  res.render("signup", { pageTitle: "Sign Up" });
};

export const postSignup = (req, res) => {
  // Render signup.pug
  res.render("signup", { pageTitle: "Sign Up" });
};

export const getSignin = (req, res) => {
  // Render serviceLogin.pug
  res.render("signin", { pageTitle: "Sign In" });
};

export const postSignin = (req, res) => {
  // Render serviceLogin.pug
  res.render("signin", { pageTitle: "Sign In" });
};

export const logout = (req, res) => {
  // Render logout.pug
  res.render("logout");
};

export const userDetail = (req, res) => {
  // Render userDetail.pug
  res.render("userDetail");
};

export const editProfile = (req, res) => {
  // Render editProfile.pug
  res.render("editProfile");
};

export const changePassword = (req, res) => {
  // Render changePassword.pug
  res.render("changePassword");
};
