const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    visa: { type: String },
    favorites: [{ type: mongoose.Types.ObjectId, ref: "Music" }],
    type: {
      type: String,
      enum: ["Customer", "Vendor", "Admin", "Gest"],
      default: "Gest",
    },
    // carts: { type: Number, default: 0 },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
