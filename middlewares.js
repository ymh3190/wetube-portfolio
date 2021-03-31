import multer from "multer";
import routes from "./routes";
import Video from "./models/Video";

const multerVideo = multer({ dest: "uploads/videos/" });
export const uploadVideo = multerVideo.single("videoFile");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  next();
};

// implements try-catch
// export const getVideo = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     const video = await Video.findById(id);
//     return video;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getVideoById = (id) => {
  try {
    const video = Video.findById(id);
    return video;
  } catch (error) {
    console.log(error);
  }
};
