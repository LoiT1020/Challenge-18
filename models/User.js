const { Schema, model } = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const Userschema = new Schema(
  {
    UserName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create the User model using the UserSchema
const User = model("User", Userschema);

// friendcount
Userschema.virtual("friendCount").get(function () {
    return this.thoughts.reduce((total, thought) => total + thought.replies.length + 1, 0);
  });

module.exports = User;
