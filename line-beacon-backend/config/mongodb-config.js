const Dotenv = require("dotenv");
Dotenv.config();
const { MongoClient } = require("mongodb");
const url = process.env.Data_Base_Url;
const client = new MongoClient(url);
const dbName = "myFirstDatabase";
const insertMongodb = async (Data) => {
  // Use connect method to connect to the server
  await client
    .connect()
    .then(async () => {
      const db = client.db(dbName);
      const collection = db.collection("beaconData");
      const insertResult = await collection.insertOne({
        contents: Data,
      });
    })
    .finally(() => {
      client.close();
    });
  // the following code examples can be pasted here...
  return "done.";
};
module.exports = insertMongodb;
