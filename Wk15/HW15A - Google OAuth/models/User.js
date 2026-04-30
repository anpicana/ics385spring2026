// This code is from the Week15 HW15A study guide

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  provider: { type: String, default: 'google' },
  createdAT: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
