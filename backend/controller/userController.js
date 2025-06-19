const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        message: "Incorrect email or Password",
        success: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({
        message: "Incorrect Username or Password",
        success: false,
      });
    user.password = "";
    return res.json({
      success: true,
      message: "login successfully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "something went wrong during login",
      data: error,
    });
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    console.log("forgot password");
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        message: "Incorrect email or Password",
        success: false,
      });
    console.log(newpassword);
    const newPassword = await bcrypt.hash(newpassword, 10);
    // const updatedUserDetails = await User.findByIdAndUpdate(
    //   user._id,
    //   { password: newPassword },
    //   { new: true }
    // );
    // updatedUserDetails.password = "";
    user.password = newPassword;
    await user.save();
    user.password = "";
    return res.json({
      success: true,
      message: "password change successfully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "something went wrong during changing password",
      data: error,
    });
  }
};
exports.Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    const usernameCheck = await User.findOne({ username });

    if (emailCheck) {
      return res.json({ message: "Email already used", success: false });
    }
    if (usernameCheck) {
      return res.json({ message: "Username already used", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(email, username, password);
    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    user.password = "";
    return res.json({
      message: "user signup successfuly",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.json({
      message: "error in signup",
      success: false,
      data: error,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const userid = req.params.id;
    const users = await User.find({ _id: { $ne: userid } });
    return res.json({
      message: "get all user succesfuly",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.json({
      message: "error in users fetching",
      success: false,
      data: error,
    });
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: avatarImage,
      },
      { new: true }
    );
    return res.json({
      message: "Avatar set successfully",
      success: true,
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in setting avatar",
      success: false,
      error: error.message,  
    });
  }
};

exports.logout = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json({ msg: "User id is required " });
    }
    onlineUsers.delete(req.params.id);
    return res.status(202).send({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "error in logout ",
      success: false,
      data: error,
    });
  }
};
