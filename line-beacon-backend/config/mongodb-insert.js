const mongoClient = require("./mongodb-config");
const insertMongodb = async (Data) => {
  const dbName = "myFirstDatabase";
  // Use connect method to connect to the server
  await mongoClient
    .connect()
    .then(async () => {
      const db = mongoClient.db(dbName);
      const collection = db.collection("beaconData");
      const insertResult = await collection.insertOne(Data);
    })
    .finally(() => {
      mongoClient.close();
    });
  // the following code examples can be pasted here...
  return "done.";
};

module.exports = { insertMongodb };
