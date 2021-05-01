const express = require("express");
const cookieParser = require("cookie-parser");
var morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser("GFG"));
app.use(express.json());
app.use(morgan("tiny"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/api/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
