const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  getPost,
  likePost,
  dislikePost,
  uploadPost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
// const { route } = require("./userRoutes");

router.route("/").post(upload.single("image"), uploadPost).get(getPost);
router.route("/like").post(likePost).delete(dislikePost);

module.exports = router;
