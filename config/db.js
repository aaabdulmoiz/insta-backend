const mongoose = require("mongoose");

const dbUri =
  "mongodb+srv://moiz:123@todolist.dkwzt.mongodb.net/instagram-clone?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(dbUri);
    console.log(`Db connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDb };
