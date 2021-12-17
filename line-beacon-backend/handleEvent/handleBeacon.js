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
        type: fineBeacon.type,
        altText: fineBeacon.title,
        contents: {
          type: "template",
          altText: "asa",
          template: {
            type: "image_carousel",
            columns: [
              {
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/beacon-backend-a8bf3.appspot.com/o/image%2Fyy4fc8adgqrigz1sxg7x3?alt=media&token=2bb10442-77c5-42c8-8592-fd619ccbd323",
                action: {
                  type: "uri",
                  label: "AAA",
                  uri: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit",
                },
              },
            ],
          },
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
