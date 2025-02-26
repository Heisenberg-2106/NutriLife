const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  weight: Number,
  bmi: Number,
  waterIntake: Number,
  calories: Number,
  protein: Number,
  fats: Number
});

module.exports = mongoose.model("DailyLog", dailyLogSchema);
