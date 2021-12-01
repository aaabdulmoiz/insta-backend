const Post = require("../models/postModel");

const createNewPost = async (query) => {
  try {
    return await Post.create(query);
  } catch (err) {
    throw new Error("Could not create a post.");
  }
};

const getPosts = async (body) => {
  try {
    const { postId } = body;
    if (postId) {
      const post = await Post.find({ _id: postId })
        .populate("author")
        .populate({
          path: "comments",
          populate: {
            path: "author",
          },
        });
      return post;
    } else {
      const post = await Post.find({})
        .populate("author")
        .populate({
          path: "comments",
          populate: {
            path: "author",
          },
        });
      return post;
    }
  } catch (err) {
    throw new Error("Could not retrieve the posts.");
  }
};

const addLike = async (body) => {
  try {
    const { postId, userId } = body;
    return await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
  } catch (err) {
    throw new Error("Unable to like the post.");
  }
};

const deleteLike = async (body) => {
  try {
    const { postId, userId } = body;
    return Post.updateOne({ _id: postId }, { $pullAll: { likes: [userId] } });
  } catch (err) {
    throw new Error("Unable to dislike the post");
  }
};

module.exports = { createNewPost, addLike, getPosts, deleteLike };
