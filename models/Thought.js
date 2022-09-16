const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const Thoughtschema = new Schema(
  {
    thoughtText: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model ("Thought",Thoughtschema);

Thoughtschema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

module.exports = Thought;