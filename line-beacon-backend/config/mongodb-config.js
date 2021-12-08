const Dotenv = require("dotenv");
Dotenv.config();
const { MongoClient } = require("mongodb");
const url = process.env.Data_Base_Url;
const mongoClient = new MongoClient(url);
const dbName = "myFirstDatabase";
const insertMongodb = async (Data) => {
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

module.exports = { insertMongodb, mongoClient };
