"use strict";

const express = require("express");

const handleEvent = require("./handleEvent/handleEvent");
const cors = require("cors");
var router = require("./router/router");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
); //跨域
app.use("/", router);
app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}); //主要line bot callback

app.get("/", (req, res) => {
  res.status(200).send("connect successfully");
});
// listen on port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
