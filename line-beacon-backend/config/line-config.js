const line = require("@line/bot-sdk");
const Dotenv = require("dotenv");
Dotenv.config();
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);
module.exports = client;
