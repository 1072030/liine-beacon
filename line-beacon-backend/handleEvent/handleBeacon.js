const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event, replyToken) => {
  let findUser;
  await mongoClient.connect().then(async () => {
    findUser = await mongoClient
      .db("myFirstDatabase")
      .collection("beaconData")
      .findOne({ name: "fresh fruit" });
  });
  client.pushMessage(replyToken, {
    type: "flex",
    altText: "this is flex",
    contents: findUser.contents,
  });
};

module.exports = handleBeacon;
