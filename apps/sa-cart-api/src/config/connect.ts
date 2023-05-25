import mongoose from "mongoose";

import { configuration } from './configuration';

mongoose.connect(configuration.DATABASE);

const dbConnection = mongoose.connection;

dbConnection.on("connected", function () {
  console.log("database is connected successfully");
});

dbConnection.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

dbConnection.on("error", console.error.bind(console, "connection error:"));

export default dbConnection;

