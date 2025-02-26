require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import User Model from models/User.js
const User = require("./models/User");
const DailyLog = require("./models/DailyLog");
const Recipe = require("./models/Recipes")
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/nutritionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅API Route to Register Users
app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, gender, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "❌ Email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      age,
      gender,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "✅ User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "❌ Server error during signup" });
  }
});

// ✅Login API Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "❌ Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "7d" });

    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "❌ Server error during login" });
  }
});

// ✅ API Route to Save Health Data
app.post("/api/save", async (req, res) => {
  try {
    const { userId, weight, height, age, bmi, bmr, category } = req.body;

    // Find user and update data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { weight, height, age, bmi, bmr, category },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "❌ User not found!" });
    }

    res.json({ message: "✅ Data saved successfully!", user: updatedUser });
  } catch (error) {
    console.error("Data Save Error:", error);
    res.status(500).json({ error: "❌ Error saving data" });
  }
});

// ✅ API Route for Daily Log
app.post("/daily-log", async (req, res) => {
  try {
    const { userId, weight, bmi, waterIntake, calories, protein, fats } = req.body;

    const newLog = new DailyLog({ userId, weight, bmi, waterIntake, calories, protein, fats });

    await newLog.save();
    res.json({ message: "✅ Daily log saved!" });
  } catch (error) {
    console.error("Daily Log Error:", error);
    res.status(500).json({ error: "❌ Error saving daily log" });
  }
});

// ✅ API Route to Fetch Daily Logs
app.get("/daily-log/:userId", async (req, res) => {
  try {
    const logs = await DailyLog.find({ userId: req.params.userId }).sort({ date: -1 }).limit(7);
    res.json(logs);
  } catch (error) {
    console.error("Fetch Daily Log Error:", error);
    res.status(500).json({ error: "❌ Error fetching daily logs" });
  }
});

// ✅ API Route for User Profile Analytics
app.get("/user-profile/:userId", async (req, res) => {
  try {
    const logs = await DailyLog.find({ userId: req.params.userId }).limit(7);

    const avgCalories = logs.reduce((sum, log) => sum + log.calories, 0) / logs.length || 0;
    const avgWater = logs.reduce((sum, log) => sum + log.waterIntake, 0) / logs.length || 0;

    res.json({ avgCalories, avgWater });
  } catch (error) {
    console.error("Profile Analytics Error:", error);
    res.status(500).json({ error: "❌ Error fetching profile analytics" });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
