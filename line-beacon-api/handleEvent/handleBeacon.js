const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const dbName = "myFirstDatabase";
const dbCollection = "beaconData";
const handleBeacon = async (event) => {
  //hwid event.beacon.hwid d
  // console.log(`get beaconId ${event.beacon.dm}`);
  let findBeacon;
  await mongoClient
    .connect()
    .then(async () => {
      try {
        findBeacon = await mongoClient
          .db(dbName)
          .collection(dbCollection)
          .findOne({ hwid: event.beacon.dm }, { sort: { $natural: -1 } });
      } catch (err) {
        console.log("cannot find beacon", err);
      }
    })
    .finally(() => {
      mongoClient.close();
    });
  switch (event.beacon.dm) {
    case "32":
      switch (findBeacon.type) {
        case "text":
          await client.pushMessage(event.source.userId, findBeacon.contents);
          break;
        case "image":
          await client.pushMessage(event.source.userId, findBeacon.contents);
          break;
        case "template":
          await client.pushMessage(event.source.userId, {
            type: findBeacon.type,
            altText: findBeacon.title,
            template: findBeacon.contents,
          });
          break;
        case "flex":
          await client.pushMessage(event.source.userId, {
            type: findBeacon.type,
            altText: findBeacon.title,
            contents: findBeacon.contents,
          });
          break;
      }
  }
};
module.exports = handleBeacon;
