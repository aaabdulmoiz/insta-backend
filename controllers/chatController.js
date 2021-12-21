const { getUserChat } = require("../services/chatServices");

const getChat = async (req, res, next) => {
  try {
    const chat = await getUserChat(req);
    res.send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports = { getChat };
