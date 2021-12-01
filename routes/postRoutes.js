const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  likePost,
  dislikePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
// const { route } = require("./userRoutes");

router.route("/").post(createPost).get(getPost);
router.route("/like").post(likePost).delete(dislikePost);

module.exports = router;
