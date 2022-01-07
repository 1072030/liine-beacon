const mongoClient = require("./mongodb-config");
const dbName = "myFirstDatabase";
const dbCollection = "beaconData";
const insertMongodb = async (Data) => {
  // Use connect method to connect to the server
  await mongoClient
    .connect()
    .then(async () => {
      const db = mongoClient.db(dbName);
      const collection = db.collection(dbCollection);
      const insertResult = await collection.insertOne(Data);
    })
    .finally(() => {
      mongoClient.close();
    });
  // the following code examples can be pasted here...
  return "done.";
};
const findBeaconData = async (hwid) => {
  let fineBeacon;
  await mongoClient
    .connect()
    .then(async () => {
      try {
        fineBeacon = await mongoClient
          .db(dbName)
          .collection(dbCollection)
          .findOne({ hwid: hwid }, { sort: { $natural: -1 } });
      } catch (err) {
        console.log("cannot find beacon", err);
      }
    })
    .finally(() => {
      mongoClient.close();
    });
  return fineBeacon;
};

module.exports = { insertMongodb, findBeaconData };
