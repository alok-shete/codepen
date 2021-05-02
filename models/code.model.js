const mongoose = require("mongoose");

const Code = mongoose.model(
  "Code",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
      title: {
        type: String,
        minlength: 4,
        required: true,
      },
      html: {
        type: String,
      },
      css: {
        type: String,
      },
      js: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

exports.Code = Code;
