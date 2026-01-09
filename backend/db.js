const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kenil:mn4rvdoLhWfkYoMm@cluster0.m2ftpvr.mongodb.net/User');
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
