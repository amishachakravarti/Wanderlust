const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function connectDB() {
  await mongoose.connect(MONGO_URL);
  console.log("DB connected");
}

async function initDB() {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("Data inserted");
}

async function start() {
  await connectDB();
  await initDB();
}

start();
