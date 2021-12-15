require("dotenv").config();

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/db");
const port = 5000;
const { notFound, errorHandler } = require("./middleware/errorhandler");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoute");
const Message = require("./models/messageModal");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

connectDb();

app.get("/getcookie", (req, res) => {
  res.send(req.cookies);
});

app.get("/deletecookie", (req, res) => {
  res.clearCookie();
  res.send(req.cookies);
});

io.on("connection", (socket) => {
  console.log("a user connected with id ", socket.id);
  socket.on("send message", async (msg) => {
    // const message = await Message.create({
    //   sender: "6189208106625c87dd3ca58c",
    //   recepient: "61891fc5c7deec8a7c90f94d",
    //   message: msg.message,
    // });
    socket.broadcast.emit("send message", {
      id: msg.id,
      message: msg.message,
    });
  });

  socket.on("private message", async (msg) => {
    socket.broadcast.emit(msg.recepient, msg);
  });

  //ill need to get userId from to user it here.
  //   socket.on(`user-${userId}`, async (msg) => {
  //     socket.broadcast.emit("send message", {
  //       id: msg.id,
  //       message: "hehehe",
  //     });
  //   });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit(
      "room message",
      `${socket.id} has disconnected
      `
    );
  });
});

app.use("/api/user", userRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comment", commentRoutes);

app.use(notFound);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`App running on port at localhost:${port}`);
});

// app.post("/api/upload", upload.single("image"), async (req, res) => {
//   try {
//     const { content, userId } = req.body;
//     const newPost = await Post.create({
//       author: userId,
//       content: content,
//       image: req.file.buffer,
//     });
//     const obj = { message: "Post successfully created.", newPost };
//     res.send(obj);
//   } catch (err) {
//     throw new Error("Could not create a post.");
//   }
// });
