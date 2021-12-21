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
const chatRoutes = require("./routes/chatRoutes");
const Message = require("./models/messageModal");
const Chat = require("./models/chatModal");
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
    socket.broadcast.emit("send message", {
      id: msg.id,
      message: msg.message,
    });
  });

  socket.on("private message", async (msg) => {
    try {
      const { sender, recepient, message } = msg;
      const newMessage = await Message.create({
        sender: sender,
        recepient: recepient,
        message: message,
      });
      let query = {
        members: { $all: [sender, recepient] },
      };
      let update = {
        $push: { messages: newMessage._id },
        members: [sender, recepient],
      };
      let options = { upsert: true, new: true, setDefaultsOnInsert: true };
      await Chat.findOneAndUpdate(query, update, options);
      socket.broadcast.emit(msg.recepient, msg);
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit(
      "room message",
      `${socket.id} has disconnected
      `
    );
  });
});

app.post("/oldchat", async (req, res, next) => {
  try {
    const { sender, recepient } = req.body;
    const chat = await Chat.findOne({
      members: { $all: [sender, recepient] },
    }).populate("messages");
    if (!chat) {
      throw new Error("No messages found");
    }
    res.send(chat);
  } catch (err) {
    next(err);
  }
});

app.use("/api/user", userRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comment", commentRoutes);

app.use("/api/chat", chatRoutes);

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
