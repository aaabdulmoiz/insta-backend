const Post = require("../models/postModel");
const cloudinary = require("../utils/cloudinary");

const createNewPost = async (query) => {
  try {
    return await Post.create(query);
  } catch (err) {
    throw new Error("Could not create a post.");
  }
};

const uploadNewPost = async (req) => {
  try {
    console.log(req.file.path);
    const image = await cloudinary.v2.uploader.upload(req.file.path);
    const { public_id, secure_url } = image;
    const { content, userId } = req.body;
    const post = await Post.create({
      author: userId,
      content: content,
      image_id: public_id,
      image_url: secure_url,
    });
    return { message: "Post created successfully", post };
  } catch (err) {
    throw new Error("Could not create the post.");
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

module.exports = {
  createNewPost,
  addLike,
  getPosts,
  deleteLike,
  uploadNewPost,
};
