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
      await client.pushMessage(event.source.userId, {
        type: "template",
        altText: "this is an image carousel template",
        template: {
          type: "image_carousel",
          columns: [
            {
              imageUrl:
                "https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg",
              action: {
                type: "uri",
                label: "動作 1",
                uri: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit",
              },
            },
          ],
        },
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
