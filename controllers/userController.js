export const signup = (req, res) => {
  // Render signup.pug
  res.render("signup");
};

export const serviceLogin = (req, res) => {
  // Render serviceLogin.pug
  res.render("serviceLogin");
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
