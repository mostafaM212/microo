const express = require("express");

const router = express.Router();
const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multerMiddleware = require("../middlewares/multer-artist.middleware");
const multerMusicMiddleware = require("../middlewares/multer-music.middleware");

router.get("", musicController.getMusics);
router.get("/:id", musicController.getMusic);

router.post(
  "",
  authMiddleware,
  multerMusicMiddleware,
  musicController.addMusic
);
router.put("/:id", authMiddleware, musicController.updateMusic);
router.delete("/:id", authMiddleware, musicController.deleteMusic);

module.exports = router;
