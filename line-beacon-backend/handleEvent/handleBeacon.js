const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event) => {
  //hwid event.beacon.hwid d
  let fineBeacon;
  await mongoClient
    .connect()
    .then(async () => {
      try {
        fineBeacon = await mongoClient
          .db("myFirstDatabase")
          .collection("beaconData")
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
      switch (fineBeacon.type) {
        case "text":
          await client.pushMessage(event.source.userId, fineBeacon.contents);
          break;
        case "image":
          await client.pushMessage(event.source.userId, fineBeacon.contents);
          break;
        case "template":
          await client.pushMessage(event.source.userId, {
            type: fineBeacon.type,
            altText: fineBeacon.title,
            template: fineBeacon.contents,
          });
          break;
        case "flex":
          await client.pushMessage(event.source.userId, {
            type: fineBeacon.type,
            altText: fineBeacon.title,
            contents: fineBeacon.contents,
          });
          break;
      }
  }
};
module.exports = handleBeacon;
