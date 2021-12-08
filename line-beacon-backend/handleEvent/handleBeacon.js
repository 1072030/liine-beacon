const client = require("../config/line-config");
const mongoClient = require("../config/mongodb-config");
const handleBeacon = async (event, replyToken) => {
  let findUser;
  await mongoClient.connect().then(async () => {
    findUser = await mongoClient
      .db("myFirstDatabase")
      .collection("beaconData")
      .findOne({ name: "fresh fruit" });
  });
  console.log(findUser);
};

module.exports = handleBeacon;
