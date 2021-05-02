const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
      },
      email: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024,
      },
    },
    {
      timestamps: true,
    }
  )
);

exports.User = User;
