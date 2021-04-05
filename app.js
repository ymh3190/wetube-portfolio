import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(globalRouter);
app.use(userRouter);
app.use(videoRouter);

export default app;
