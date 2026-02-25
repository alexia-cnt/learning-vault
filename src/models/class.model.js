const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    
    content: {
      type: String,
      default: "",
    },

    resources: [
      {
        type: String,
      }
    ],

    images: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true }
);


module.exports = mongoose.model("Class", classSchema);