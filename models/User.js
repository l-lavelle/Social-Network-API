const { Schema, model } = require("mongoose");

// Create user Schema
const userSchema = new Schema(
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
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Create virtual to count number of friends
userSchema.virtual("friendCount").get(function () {
  if (this.friends) {
    return this.friends.length;
  }
});

// Create user model with user schema
const User = model("User", userSchema);

module.exports = User;
