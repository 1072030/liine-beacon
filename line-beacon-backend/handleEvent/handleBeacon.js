const client = require("../config/line-config");
const { findBeaconData } = require("../config/mongodb-service");
const handleBeacon = async (event) => {
  //hwid event.beacon.hwid d
  // console.log(`get beaconId ${event.beacon.dm}`);
  let findBeacon;
  findBeacon = await findBeaconData(event.beacon.dm);
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
