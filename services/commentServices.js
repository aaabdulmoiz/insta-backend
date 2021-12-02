const Post = require("../models/postModel");
const Comment = require("../models/commentModal");

const addComment = async (body) => {
  try {
    const { text, userId, postId } = body;
    let comment = await Comment.create({ author: userId, text: text });
    await Comment.populate(comment, { path: "author" });
    await Post.updateOne({ _id: postId }, { $push: { comments: comment._id } });
    return comment;
  } catch (err) {
    throw new Error({ message: "Could not create a comment." });
  }
};

module.exports = { addComment };
