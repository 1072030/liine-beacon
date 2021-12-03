"use strict";

const express = require("express");

const handleEvent = require("./handleEvent/handleEvent");
const recreateJson = require("./common/algorithm");
const cors = require("cors");
const Dotenv = require("dotenv");
Dotenv.config();
// create LINE SDK config from env variables

// create LINE SDK client

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.use(cors());
app.use(express.json());

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
  let data = recreateJson(req.body);
  Object.assign(data, {
    type: "bubble",
  });
  // console.log(data);
  res.send(data);
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
