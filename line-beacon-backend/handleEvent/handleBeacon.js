const client = require("../config/line-config");

const handleBeacon = async (event, replyToken) => {
  await client.replyMessage(replyToken, {});
};

module.exports = handleBeacon;
