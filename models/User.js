const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: {
      references: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    },
    friends: {
      references: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

mongoose.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
