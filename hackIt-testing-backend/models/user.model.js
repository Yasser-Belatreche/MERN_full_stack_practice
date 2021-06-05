const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  motivation: { type: String, required: false, trim: true },
  githubLink: { type: String, required: false, trim: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
