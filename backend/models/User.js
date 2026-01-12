const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  country: { type: String },
  avatar: { type: String },
  bio: { type: String, default: '' },
  socials: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
