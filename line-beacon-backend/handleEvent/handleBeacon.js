const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event, replyToken) => {
  let findUser;
  await mongoClient.connect().then(async () => {
    console.log(event);
    //hwid event.beacon.hwid d
    try {
      findUser = await mongoClient
        .db("myFirstDatabase")
        .collection("beaconData")
        .findOne({ userId: "fresh fruit" }, { sort: { $natural: -1 } });
    } catch (err) {
      console.log(err);
    }
    console.log(findUser);
  });

  await client.pushMessage(event.source.userId, {
    type: "flex",
    altText: findUser.title,
    contents: findUser.contents,
  });
};

module.exports = handleBeacon;
