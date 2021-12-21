const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
