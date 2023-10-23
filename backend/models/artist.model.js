var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var artistSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    image: { type: String, required: true },

    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);
// Compile model from schema
module.exports = mongoose.model("Artist", artistSchema);
