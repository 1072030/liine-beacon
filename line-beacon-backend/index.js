"use strict";

const express = require("express");
const Dotenv = require("dotenv");
const handleEvent = require("./handleEvent/handleEvent");
const recreateJson = require("./common/algorithm");
Dotenv.config();
// create LINE SDK config from env variables

// create LINE SDK client

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
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
  console.log(req.body);
  recreateJson(req.body);
  res.send({
    status: "success",
    message: req.body,
  });
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`listening on ${port}`);
});
