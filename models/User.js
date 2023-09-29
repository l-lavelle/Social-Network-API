const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //need to validate
  },
  thoughts:, //needs to reference Thought model (_id values),
  friends: //values referencing the User model (self-reference)(_id values),
});
