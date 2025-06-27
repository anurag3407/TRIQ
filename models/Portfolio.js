const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    uppercase: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  avgBuyPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    stocks: [stockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
