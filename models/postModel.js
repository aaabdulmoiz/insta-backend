const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    //author, content, image, comments,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Banned", "Deleted"],
      default: "Active",
    },
    // heading,
    // description
    content: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
