var express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../auth");
const { User } = require("../models/user.model");

const accessTokenSecret = process.env.ACCESSTOKENSECRET;
console.log(accessTokenSecret);

router.post("/registration", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user
      .save()
      .then(() => res.json("User Added!"))
      .catch((err) => res.status(400).json("Error" + err));
  }
});

router.post("/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  } else {
    const accessToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      accessTokenSecret
    );

    res
      .status(202)
      .cookie("session", accessToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        signed: true,
      })
      .send("Login Sccessful");
  }
});

router.get("/logout", async (req, res) => {
  res
    .cookie("session", "", {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 1000),
      httpOnly: true,
      signed: true,
    })
    .json({
      success: true,
      message: "Logout",
    });
});

router.get("/check", auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
