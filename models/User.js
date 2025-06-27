const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "premium"],
      required: true,
    },
    settings: {
      riskLevel: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
      preferredStocks: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
