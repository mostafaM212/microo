const Artist = require("../models/artist.model");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
exports.getArtists = (req, res, next) => {
  Artist.find()
    .then((data) => {
      return res.status(200).json({
        message: "artists",
        artists: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.getArtist = (req, res, next) => {
  console.log("test", req.params.id);

  Artist.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "musics",
        localField: "_id",
        foreignField: "artist",
        as: "musics",
      },
    },
  ])
    .then((data) => {
      console.log("test", data);

      return res.status(200).json({
        message: "artist",
        artist: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.addArtist = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const errors = validationResult(req);
  // console.log("test", req.body, req.file.filename);

  // if (!errors.isEmpty()) {
  //   console.log("test", errors);

  //   return res.status(400).json({ errors: errors.array });
  // }
  // console.log("test", req.file.filename);

  let artist = new Artist({
    ...req.body,
    image: url + "/images/artists/" + req.file.filename,
  });
  console.log("test", artist);

  artist
    .save()
    .then((data) => {
      return res.status(200).json({
        message: "artists",
        artist: artist,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.updateArtist = (req, res, next) => {
  const errors = validationResult(req);

  if (errors) {
    return res.status(400).json(errors.array);
  }
  Artist.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      return res.status(200).json({
        message: "artists",
        artists: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};

exports.deleteArtist = (req, res, next) => {
  Artist.deleteOne({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({
        message: "artists deleted successfully",
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "Error On Fetch data",
      });
    });
};
