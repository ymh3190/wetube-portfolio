import mongoose from "mongoose";

async function run() {
  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    githubId: Number,
  });

  const User = mongoose.model("User", UserSchema, "User");
  User.watch().on("change", (data) => console.log(new Date(), data));

  console.log(new Date(), "Inserting doc");
}
