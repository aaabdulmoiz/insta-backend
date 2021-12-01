require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { connectDb } = require("./config/db");
const port = 5000;
const { notFound, errorHandler } = require("./middleware/errorhandler");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoute");
const Post = require("./models/postModel");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const upload = multer();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

connectDb();

app.get("/getcookie", (req, res) => {
  res.send(req.cookies);
});

app.get("/deletecookie", (req, res) => {
  res.clearCookie();
});

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { content, userId } = req.body;
    const newPost = await Post.create({
      author: userId,
      content: content,
      image: req.file.buffer,
    });
    const obj = { message: "Post successfully created.", newPost };
    res.send(obj);
  } catch (err) {
    throw new Error("Could not create a post.");
  }
});

app.use("/api/user", userRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comment", commentRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port at localhost:${port}`);
});
