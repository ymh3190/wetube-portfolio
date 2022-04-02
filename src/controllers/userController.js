import User from "../models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

const saltRounds = 10;

export const getSignin = (req, res) => res.render("signin");

export const postSignin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .render("signin", { error: "이메일이 존재하지 않습니다." });
    }

    // 비밀번호 체크
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      req.session.user = user;
      return res.redirect("/");
    } else {
      return res
        .status(400)
        .render("signin", { error: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSignup = (req, res) => res.render("signup");

export const postSignup = async (req, res) => {
  const {
    body: { firstName, LastName, email, password, confirmPassword },
  } = req;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .render("signup", { error: "비밀번호가 일치하지 않습니다." });
  }

  if (await User.exists({ email })) {
    return res
      .status(400)
      .render("signup", { error: "이미 존재하는 이메일입니다." });
  }

  // 메일 보내기
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Transporter Team" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: `${LastName}, finish setting up your new Account`,
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render("signup", { error: "메일을 전송할 수 없습니다." });
  }

  // 비밀번호 해쉬
  try {
    await User.create({
      firstName,
      LastName,
      email,
      password: await bcrypt.hash(password, saltRounds),
    });
    return res.redirect("/signin");
  } catch (error) {
    console.log(error);
    return res.render("signup", { error: "해쉬를 할 수 없습니다." });
  }
};

export const signout = async (req, res) => {
  await req.session.destroy();
  return res.redirect("/");
};

export const github = (req, res) => {
  // github open auth
  const params = `client_id=${process.env.GITHUB_CLIENT}&scope=read:user`; // %20user:email
  const url = `https://github.com/login/oauth/authorize?${params}`;
  return res.redirect(url);
};

export const githubCallback = async (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://github.com/login/oauth/access_token?${params}`;

  const response = await (
    await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in response) {
    const { access_token } = response;
    const userData = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    try {
      const email = userData.email;
      let user = await User.findOne({ email });
      if (!user) {
        const [firstName, lastName] = userData.name.split(" ");
        user = await User.create({
          firstName,
          lastName,
          email,
          password: await bcrypt.hash("", saltRounds),
        });
      }
      req.session.user = user;
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/signin");
  }
};

export const facebook = (req, res) => {
  const config = {
    client_id: process.env.FACEBOOK_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/facebook/callback`,
    scope: "email public_profile user_likes",
    auth_type: "rerequest",
    state: "{st=state123abc,ds=123456789}",
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://www.facebook.com/v13.0/dialog/oauth?${params}`;
  return res.redirect(url);
};

export const facebookCallback = async (req, res) => {
  const config = {
    client_id: process.env.FACEBOOK_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/facebook/callback`,
    client_secret: process.env.FACEBOOK_CLIENT,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://graph.facebook.com/v13.0/oauth/access_token?${params}`;

  const response = await (await fetch(url)).json();

  if ("access_token" in response) {
    const { access_token } = response;

    // 앱 액세스 토큰 생성
    const { access_token: app_access_token } = await (
      await fetch(
        `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_ID}&client_secret=${process.env.FACEBOOK_CLIENT}&grant_type=client_credentials`
      )
    ).json();

    const {
      data: { user_id },
    } = await (
      await fetch(
        `https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${app_access_token}`
      )
    ).json();

    const { first_name, last_name, email } = await (
      await fetch(
        `https://graph.facebook.com/v13.0/${user_id}?fields=first_name,last_name,email&access_token=${access_token}`
      )
    ).json();

    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          firstName: first_name,
          lastName: last_name,
          email,
          password: await bcrypt.hash("", saltRounds),
        });
      }
      req.session.user = user;
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.redirect("/signin");
    }
  } else {
    return res.redirect("/signin");
  }
};
