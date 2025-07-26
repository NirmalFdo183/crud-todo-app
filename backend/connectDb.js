const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
