const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "link"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Block", blockSchema);