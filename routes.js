// Global routes
const HOME = "/";
const SEARCH = "/search";
const SIGNUP = "/signup";
const SERVICE_LOGIN = "/service-login";
const LOGOUT = "/logout";

// User routes
const USER_DETAIL = "/user/:id";
const EDIT_PROFILE = "/user/:id/edit-profile";
const CAHNGE_PASSWORD = "/user/:id/change-password";

// Video routes
const VIDEO_DETAIL = "/video/:id";
const UPLOAD_VIDEO = "/video/upload";
const EDIT_VIDEO = "/video/:id/edit-video";
const DELETE_VIDEO = "/video/:id/delete-video";

const routes = {
  home: HOME,
  search: SEARCH,
  signup: SIGNUP,
  serviceLogin: SERVICE_LOGIN,
  logout: LOGOUT,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CAHNGE_PASSWORD,
  videoDetail: VIDEO_DETAIL,
  uploadVideo: UPLOAD_VIDEO,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default routes;
