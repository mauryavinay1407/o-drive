const { signUpFormat, loginFormat } = require("../utils/zodValidation");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUserGET = (req, res) => {
  res.render("sign-up");
};

const signInUserGET = (req, res) => {
  res.render("login");
};

const homepage = (req, res) => {
  res.render("home");
};

const signUpUserPOST = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const obj = req.body;
    console.log(obj);
    const result = signUpFormat.safeParse(obj);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));

      return res.status(401).json({
        message: "Invalid data",
        errors: errors,
      });
    }

    const isUserExist = await User.findOne({ email: email });

    if (isUserExist)
      return res.status(401).json({
        message: "User with this username already exist, try login",
      });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY);

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options);

    res.status(201).json({
      redirectUrl: "/user/home",
      msg: "Successfully registered",
      username: savedUser.username,
    });
  } catch (error) {
    console.log("Error while creating user");
    throw new Error(error);
  }
};

const signInUserPOST = async (req, res) => {
  try {
    const { email, password } = req.body;

    const obj = req.body;

    const result = loginFormat.safeParse(obj);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));

      return res.status(401).json({
        message: "Invalid data",
        errors: errors,
      });
    }

    console.log(req.body);
    if (!email || !password)
      return res.status(401).json({
        message: "Invalid data",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({
        message: "User not exists,kindly signup first",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({
        message: "Incorrect email or password!!!",
      });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options);

    res.status(201).json({
      redirectUrl: "/user/home",
      msg: "Successfully logged in",
      username: user.username,
    });
  } catch (error) {
    console.log("Error while login user");
    return res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
};

const logoutUser = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: false,
  };
  res.status(200).clearCookie("token", options).json({
    msg: "logged out successfully",
    redirectUrl: "/",
  });
};

module.exports = {
  signUpUserGET,
  signInUserGET,
  signUpUserPOST,
  signInUserPOST,
  homepage,
  logoutUser,
};
