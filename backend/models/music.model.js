var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var musicSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    artist: { type: mongoose.Types.ObjectId, required: true, ref: "Artist" },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);
// Compile model from schema
module.exports = mongoose.model("Music", musicSchema);
