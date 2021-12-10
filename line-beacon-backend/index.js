"use strict";

const express = require("express");

const handleEvent = require("./handleEvent/handleEvent");
const recreateJson = require("./common/algorithm-bubble");
const { insertMongodb } = require("./config/mongodb-config");
const cors = require("cors");
const Dotenv = require("dotenv");
Dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
); //跨域
app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}); //主要line bot callback
app.post("/beacon", (req, res) => {
  //修改mongodb
  console.log(req.body);
  const { userId, title, type } = req.body;
  console.log(userId);
  let data;
  data = recreateJson(req.body.contents); //bubble演算法
  try {
    insertMongodb({
      userId: userId,
      type: type,
      title: title,
      contents: data,
    });
  } catch (err) {
    console.log(err);
    res.send("fail to insert mongodb", err).end();
  }
  res.send("successful").end();
});
app.get("/", (req, res) => {
  res.send("connect successfully").end();
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
