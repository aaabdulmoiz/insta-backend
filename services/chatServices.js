const Chat = require("../models/chatModal");

const getUserChat = async (req) => {
  const { sender, recepient } = req.body;
  const chat = await Chat.findOne({
    members: { $all: [sender, recepient] },
  }).populate("messages");
  if (!chat) {
    throw new Error("No messages found");
  }
  return chat;
};

module.exports = { getUserChat };
