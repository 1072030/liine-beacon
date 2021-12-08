const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event, replyToken) => {
  let findUser;
  await mongoClient.connect().then(async () => {
    console.log(event);
    findUser = await mongoClient
      .db("myFirstDatabase")
      .collection("beaconData")
      .findOne({ name: "fresh fruit" });
  });
  // await client.pushMessage(event, {
  //   type: "flex",
  //   altText: "this is flex",
  //   contents: findUser.contents,
  // });
};

module.exports = handleBeacon;
