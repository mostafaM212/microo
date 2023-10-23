const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const usersController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// const validationErrorMiddleware = require("../middleware/validationError.middleware");
router.get("", usersController.getUsers);

router.post("", usersController.addUser);
router.post("/login", usersController.loginUser);

router.get("/:id", usersController.getUser);
router.put(
  "/:id",

  authMiddleware,
  usersController.updateUser
);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;
