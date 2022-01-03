const client = require("../config/line-config");
const { mongoClient } = require("../config/mongodb-config");
const handleBeacon = async (event) => {
  console.log(event);
  //hwid event.beacon.hwid d
  let fineBeacon;
  switch (event.beacon.dm) {
    case "32":
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
      if (fineBeacon.type === "flex") {
        await client.pushMessage(event.source.userId, {
          type: fineBeacon.type,
          altText: fineBeacon.title,
          contents: fineBeacon.contents,
        });
      } else if (fineBeacon.type === "template") {
        await client.pushMessage(event.source.userId, {
          type: "template",
          altText: "this is an image carousel template",
          template: {
            type: "image_carousel",
            columns: [
              {
                imageUrl:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                action: {
                  type: "uri",
                  label: "動作 1",
                  uri: "https://github.com/clarencetw/line-bot/blob/fde20e86a92649a4f2c86dbed6846cac46eeaaf7/routes/line.js#L67-L92",
                },
              },
            ],
          },
        });
      }
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
