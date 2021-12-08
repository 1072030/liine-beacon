"use strict";

const express = require("express");

const handleEvent = require("./handleEvent/handleEvent");
const recreateJson = require("./common/algorithm");
const insertMongodb = require("./config/mongodb-config");
const cors = require("cors");
const Dotenv = require("dotenv");
Dotenv.config();
// create LINE SDK config from env variables

// create LINE SDK client

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
app.post("/beacon", (req, res) => {
  let data = recreateJson(JSON.stringify(req.body));
  console.log(data);
  insertMongodb(data);
  res.send(data).end();
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
