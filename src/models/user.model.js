const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  profilePicture: {
    type: Buffer,
  },
  birthdate: {
    type: Date,
    required: false,
    validate: {
      validator: function (birthdate) {
        return birthdate < new Date();
      },
      message: 'Birthdate must be in the past',
    },
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (phoneNumber) {
        return /^\d{10}$/.test(phoneNumber);
      },
      message: 'Invalid phone number format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
});
module.exports = mongoose.model("user", userSchema);
