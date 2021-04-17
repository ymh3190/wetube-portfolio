// Global routes
const HOME = "/";
const SEARCH = "/search";
const SIGNUP = "/signup";
const SIGNIN = "/signin";
const LOGOUT = "/logout";

// User routes
const USER_DETAIL = "/user/:id";

// Video routes
const VIDEO_DETAIL = "/video/:userId/:videoId";
const WATCH_VIDEO = "/video/watch/:id";
const UPLOAD_VIDEO = "/video/upload";
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
const ADD_COMMENT = "/api/:id/comment";
const DELETE_COMMENT = "/api/:id/delete";
// const DELETE_COMMENT = "/api/:videoId/delete";
// const DELETE_COMMENT = "/api/:videoId/:commentId/delete";

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
  videoDetail: (userId, videoId) => {
    if (userId && videoId) {
      return `/video/${userId}/${videoId}`;
    } else if (userId && !videoId) {
      return `/video/${userId}/:videoId`;
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
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT,
};

export default routes;
