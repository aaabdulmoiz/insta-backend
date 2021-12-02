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
    content: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    image_id: {
      type: String,
    },
    image_url: {
      type: String,
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
