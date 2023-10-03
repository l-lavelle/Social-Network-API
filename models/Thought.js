const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {},
  reactionBody: {
    type: String,
    required: [true, "Must have a reaction"],
    maxLength: 280,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // get:
    // Use a getter method to format the timestamp on query
  },
});
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: [true, "Thought is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get:
      // Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
