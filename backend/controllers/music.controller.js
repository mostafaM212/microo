const Music = require("../models/music.model");
const { check, validationResult } = require("express-validator");

exports.getMusics = (req, res, next) => {
  Music.find()
    .populate("artist")
    .then((data) => {
      return res.status(200).json({
        message: "Musics ",
        musics: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.getMusic = (req, res, next) => {
  Music.findOne({ _id: req.params.id })
    .populate("artist")
    .then((data) => {
      return res.status(200).json({
        message: "Musics",
        music: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.addMusic = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("test", req.body);

  let music = new Music({
    title: req.body.title,
    description: req.body.description,
    artist: req.body.artist,
    path: url + "/images/music/" + req.file.filename,
  });
  console.log("test", music);

  music
    .save()
    .then((data) => {
      return res.status(200).json({
        message: "Musics",
        music: music,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.updateMusic = (req, res, next) => {
  // const errors = validationResult(req);

  if (errors) {
    return req.status(400).json(errors.array);
  }
  Music.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      return res.status(200).json({
        message: "artists",
        music: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.deleteMusic = (req, res, next) => {
  Music.deleteOne({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({
        message: "Music deleted successfully",
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};
