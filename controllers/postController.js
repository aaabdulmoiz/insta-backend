const {
  addLike,
  deleteLike,
  getPosts,
  uploadNewPost,
} = require("../services/postServices");
const { updateOneUser } = require("../services/userServices");
const { validatePost } = require("../helpers/validateFields");

const uploadPost = async (req, res, next) => {
  try {
    const post = await uploadNewPost(req);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const posts = await getPosts(req.body);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const likePost = async (req, res, next) => {
  try {
    await addLike(req.body);
    res.json({ message: "Like added successfully." });
  } catch (err) {
    next(err);
  }
};

const dislikePost = async (req, res, next) => {
  try {
    await deleteLike(req.body);
    res.json({ message: "Disliked post successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPost, likePost, dislikePost, uploadPost };

// const getPosts = async (req, res) => {
//   try {
//     const { onlyMe = false, uid } = req.headers;
//     const query = {};
//     if (onlyMe) {
//       query.author = uid;
//     }

//     const post = await Post.find(query).populate("author").select("-nAME");
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

// const createPost = async (req, res, next) => {
//   try {
//     const { userId, content } = req.body;
//     const postQuery = { author: userId, content: content };
//     validatePost(req.body);
//     if (!req.cookies[userId]) {
//       // move on if no author cookies
//       throw new Error("Could not proceed with the request.");
//     }
//     const post = await createNewPost(postQuery);
//     await updateOneUser({ _id: userId }, { $push: { posts: post._id } });
//     res.json({ message: "Post created successfully." });
//   } catch (err) {
//     next(err);
//   }
// };
