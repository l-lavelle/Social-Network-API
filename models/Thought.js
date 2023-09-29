const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    minLength: 1,
    maxLength: 280,
    required: true,
  },
  createdAt: {
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
  },
  username: {
    type: String,
    required: true,
    // (The user that created this thought)
  },
  reactions: {
    // (These are like replies)
    // Array of nested documents created with the reactionSchema
  },
});
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
