const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const constant = require("../constants");

exports.getUsers = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};

exports.getUser = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};
exports.addUser = async (req, res, next) => {
  console.log("test", req.body);
  await User.findOne({ email: req.body.email }).then((data) => {
    // console.log("test", data);

    if (data) {
      return res.status(400).json({
        message: "This Email is already in use",
      });
    }
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPass) => {
        const user = new User({
          email: req.body.email,
          password: hashedPass,
          country: req.body.country,
          phone: req.body.phone,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          visa: req.body.visa,
        });
        user.save().then((e) => {
          return res.status(200).json({
            message: "user inserted successfully",
            user: user,
          });
        });
      })
      .catch((e) => {
        return res.status(400).json({
          message: "This Email is already in use",
        });
      });
  });
};
exports.updateUser = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};
exports.deleteUser = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};

exports.loginUser = (req, res, next) => {
  let userData = null;
  User.findOne({ email: req.body.email }).then((user) => {
    userData = user;

    if (!user) {
      return res.status(500).json({
        message: "this email is not found!",
      });
    }
    bcrypt.compare(req.body.password, user.password).then((validPass) => {
      if (!validPass) {
        return res.status(500).json({
          message: "Invalid Password",
        });
      }
      const token = jwt.sign(
        { _id: userData._id, email: userData.email },
        constant.JWT_SECRET,
        {
          expiresIn: "4h",
        }
      );

      // console.log("test", token, userData);
      delete userData.password;
      return res.status(200).json({
        message: "user Login successfully",
        token: token,
        user: returnUserData(userData),
      });
    });
  });
  // bcrypt.compare(req.body.password)
};

returnUserData = (userData) => {
  return {
    _id: userData._id,
    email: userData.email,
    country: userData.country,
    phone: userData.phone,
    firstName: userData.firstName,
    lastName: userData.lastName,
    address: userData.address,
    visa: userData.visa,
    createdAt: userData.createdAt,
  };
};
