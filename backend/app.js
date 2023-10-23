const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const app = express();
const angularCoreMiddleware = require("./middlewares/angularCoreHeaders.middleware");
const userRoutes = require("./routes/user");
const artistRoutes = require("./routes/artist");
const musicRoutes = require("./routes/music");

mongoose
  .connect("mongodb://localhost:27017/microo")
  .then((data) => {
    console.log("test", "connected to database successfully");
  })
  .catch((e) => {
    console.log("test", "failed to connect to database", e);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(angularCoreMiddleware);
app.use("/images", express.static(path.join("backend/images")));

app.use("/users", userRoutes);
app.use("/artists", artistRoutes);
app.use("/musics", musicRoutes);

app.use((req, res, next) => {
  res.send("hello from express");
});
module.exports = app;
