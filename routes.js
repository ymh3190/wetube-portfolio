// Global routes
const HOME = "/";
const SEARCH = "/search";
const SIGNUP = "/signup";
const SIGNIN = "/signin";
const LOGOUT = "/logout";

// User routes
const USER_DETAIL = "/user/:id";
const EDIT_PROFILE = "/user/:id/edit-profile";
const CAHNGE_PASSWORD = "/user/:id/change-password";

// Video routes
const VIDEO_DETAIL = "/video/:id/detail";
const WATCH_VIDEO = "/video/watch/:id";
const UPLOAD_VIDEO = "/video/upload";
const EDIT_VIDEO = "/video/:id/edit-video";
const DELETE_VIDEO = "/video/:id/delete-video";
const YOUR_VIDEO = "/video/:id/your";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// Instagram
const INSTAGRAM = "/auth/instagram";
const INSTAGRAM_CALLBACK = "/auth/instagram/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/api/:id/view";

const routes = {
  home: HOME,
  search: SEARCH,
  signup: SIGNUP,
  signin: SIGNIN,
  logout: LOGOUT,
  userDetail: (id) => {
    if (id) {
      return `/user/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: (id) => {
    if (id) {
      return `/user/${id}/edit-profile`;
    } else {
      return EDIT_PROFILE;
    }
  },
  changePassword: (id) => {
    if (id) {
      return `/user/${id}/change-password`;
    } else {
      return CAHNGE_PASSWORD;
    }
  },
  videoDetail: (id) => {
    if (id) {
      return `/video/${id}/detail`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  watchVideo: (id) => {
    if (id) {
      return `/video/watch/${id}`;
    } else {
      return WATCH_VIDEO;
    }
  },
  uploadVideo: UPLOAD_VIDEO,
  editVideo: (id) => {
    if (id) {
      return `/video/${id}/edit-video`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/video/${id}/delete-video`;
    } else {
      return DELETE_VIDEO;
    }
  },
  yourVideo: (id) => {
    if (id) {
      return `/video/${id}/your`;
    } else {
      return YOUR_VIDEO;
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  instagram: INSTAGRAM,
  instagramCallback: INSTAGRAM_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
};

export default routes;
