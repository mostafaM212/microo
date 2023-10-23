const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const artistController = require("../controllers/artist.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multerMiddleware = require("../middlewares/multer-artist.middleware");
router.get("", artistController.getArtists);
router.get("/:id", artistController.getArtist);

router.post("", authMiddleware, multerMiddleware, artistController.addArtist);
router.put("/:id", authMiddleware, artistController.updateArtist);
router.delete("/:id", authMiddleware, artistController.deleteArtist);

module.exports = router;
