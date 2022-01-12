const Dotenv = require("dotenv");
Dotenv.config();
const { MongoClient } = require("mongodb");
const url = process.env.DATABASEURL;
const mongoClient = new MongoClient(url);

module.exports = { mongoClient };
