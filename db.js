import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, `connection error`));
db.once("open", () => console.log(`👍 Connected to DB`));
