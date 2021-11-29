const MongoClient = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "beaconSetting";
export async function insertMongodb(Data) {
  // Use connect method to connect to the server
  await client
    .connect()
    .then(async () => {
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection("documents");
      const insertResult = await collection.insertOne(Data);
    })
    .finally(() => {
      client.close();
    });
  // the following code examples can be pasted here...
  return "done.";
}
