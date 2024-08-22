const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);
require("dotenv").config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.Db);
    console.log(
      "Database Connected"
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
