const { addComment } = require("../services/commentServices");

const createComment = async (req, res, next) => {
  try {
    const comment = await addComment(req.body);
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

module.exports = { createComment };
