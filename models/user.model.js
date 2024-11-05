const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 3,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase:true,
    maxLength: 50,
    minLength: 3,
  },
  password:{
    type: String,
    required: true,
    minLength:8
  }
});

const User = mongoose.model("User",userSchema);

module.exports = {User};