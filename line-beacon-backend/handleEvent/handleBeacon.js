const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event) => {
  console.log(event);
  //hwid event.beacon.hwid d
  let fineBeacon;
  switch (event.beacon.hwid) {
    case "0156d875eb":
      await mongoClient
        .connect()
        .then(async () => {
          try {
            fineBeacon = await mongoClient
              .db("myFirstDatabase")
              .collection("beaconData")
              .findOne({ hwid: event.beacon.hwid }, { sort: { $natural: -1 } });
          } catch (err) {
            console.log("cannot find beacon", err);
          }
        })
        .finally(() => {
          mongoClient.close();
        });
      await client.pushMessage(event.source.userId, {
        type: fineBeacon.type,
        altText: fineBeacon.title,
        contents: fineBeacon.contents,
      });
      break;
  }
};
// await mongoClient
//   .connect()
//   .then(async () => {
//     console.log(event);
//     //hwid event.beacon.hwid d
//     try {
//       findUser = await mongoClient
//         .db("myFirstDatabase")
//         .collection("beaconData")
//         .findOne({ userId: "fresh fruit" }, { sort: { $natural: -1 } });
//     } catch (err) {
//       console.log("cannot find user", err);
//     }
//   })
//   .finally(() => {
//     mongoClient.close();
//   });
// switch (findUser.type) {
//   case "flex":
//     await client.pushMessage(event.source.userId, {
//       type: "flex",
//       altText: findUser.title,
//       contents: findUser.contents,
//     });
//     break;
//   case "imageCarousel":
//     break;

module.exports = handleBeacon;
