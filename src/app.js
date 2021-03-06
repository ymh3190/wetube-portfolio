import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import passport from "passport";
import morgan from "morgan";
import path from "path";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(globalRouter);
app.use(userRouter);
app.use(videoRouter);
app.use(apiRouter);

export default app;
