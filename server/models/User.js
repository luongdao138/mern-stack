const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    salt: String,
    role: {
      type: String,
      default: 'normal',
    },
    resetPasswordLink: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
