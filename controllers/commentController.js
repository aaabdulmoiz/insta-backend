const Post = require("../models/postModel");
const Comment = require("../models/commentModal");

const createComment = async (req, res) => {
  try {
    const { text, userId, postId } = req.body;
    let comment = await Comment.create({ author: userId, text: text });
    await Comment.populate(comment, { path: "author" });
    await Post.updateOne({ _id: postId }, { $push: { comments: comment._id } });
    res.json(comment);
  } catch (err) {
    throw new Error({ message: "Could not create a comment." });
  }
};

module.exports = { createComment };
