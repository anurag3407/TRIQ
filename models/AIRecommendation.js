const mongoose = require("mongoose");

const aiRecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticker: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    recommendation: {
      type: String,
      enum: ["BUY", "SELL", "HOLD"],
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      required: true, 
    },
    reason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIRecommendation", aiRecommendationSchema);