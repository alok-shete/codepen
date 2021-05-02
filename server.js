const express = require("express");
const cookieParser = require("cookie-parser");
var morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// middelware
app.use(cookieParser("GFG"));
app.use(express.json());
app.use(morgan("tiny"));

//database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// check env
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// api
const codesRouter = require("./routes/codes");
const usersRouter = require("./routes/users");

app.use("/api/code", codesRouter);
app.use("/api/user", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
