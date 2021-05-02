var express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Code } = require("../models/code.model");
var ObjectID = require("mongodb").ObjectID;

const auth = require("../auth");

router.get("/", auth, async (req, res) => {
  Code.find({ email: req.user.email })
    .then((codes) => res.json(codes))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/:id", auth, async (req, res) => {
  Code.find({ email: req.user.email, _id: req.params.id })
    .then((codes) => res.json(codes))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/add", auth, async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  var code = {
    _id: new ObjectID(),
    email: req.user.email,
    title: req.body.title,
    html: "",
    css: "",
    js: "",
  };

  const newCode = new Code(code);
  newCode
    .save()
    .then(() => res.json(code))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/update", auth, async (req, res) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().min(4).required(),
    html: Joi.string().allow(null).allow("").optional(),
    css: Joi.string().allow(null).allow("").optional(),
    js: Joi.string().allow(null).allow("").optional(),
  });

  const { error } = schema.validate(req.body);
  const { _id, title, html, css, js } = req.body;
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  let query = { _id, email: req.user.email };
  var newvalues = { $set: { title, html, css, js } };
  Code.updateOne(query, newvalues)
    .then(() => res.json("Project Updated"))
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
