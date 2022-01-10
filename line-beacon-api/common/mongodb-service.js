const { mongoClient } = require("../config/mongodb-config");
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

module.exports = { insertMongodb };
