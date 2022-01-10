const Dotenv = require("dotenv");
Dotenv.config();
const { MongoClient } = require("mongodb");
const url = process.env.Data_Base_Url;
const mongoClient = new MongoClient(url);

module.exports = { mongoClient };
