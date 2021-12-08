const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event, replyToken) => {
  let findUser;
  await mongoClient.connect().then(async () => {
    console.log(event);
    //hwid event.beacon.hwid d
    findUser = await mongoClient
      .db("myFirstDatabase")
      .collection("beaconData")
      .find({ name: "fresh fruit" }, { limit: 1 })
      .sort({ $natural: -1 });
    console.log(findUser);
  });

  await client.pushMessage(event.source.userId, {
    type: "flex",
    altText: "this is flex",
    contents: findUser.contents,
  });
};

module.exports = handleBeacon;
