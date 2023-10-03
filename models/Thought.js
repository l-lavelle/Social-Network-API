const { Schema, model } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
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
    get: formatDate,
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
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

function formatDate(value) {
  return moment(value).format(`MM-DD-YYYY`);
}
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
