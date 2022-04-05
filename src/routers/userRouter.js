import express from "express";
import {
  githubCallback,
  github,
  facebook,
  facebookCallback,
  naver,
  naverCallback,
  kakao,
  kakaoCallback,
  google,
  googleCallback,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github", github);
userRouter.get("/github/callback", githubCallback);
userRouter.get("/facebook", facebook);
userRouter.get("/facebook/callback", facebookCallback);
userRouter.get("/naver", naver);
userRouter.get("/naver/callback", naverCallback);
userRouter.get("/kakao", kakao);
userRouter.get("/kakao/callback", kakaoCallback);
userRouter.get("/google", google);
userRouter.get("/google/callback", googleCallback);

export default userRouter;
