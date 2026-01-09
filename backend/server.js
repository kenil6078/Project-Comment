const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const users = require("./model/UserModel");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MongoDB Atlas Connected 🚀");
});

app.post("/createUser", async (req, res) => {
  try {
    const user = await Users.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/readAllUser", async (req, res) => {
  try {
    const users = await Users.find();

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
});




app.listen(3000,()=>{

})
