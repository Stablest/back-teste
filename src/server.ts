import { configDotenv } from "dotenv";
import { app } from "./app";
import mongoose from "mongoose";
configDotenv();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "";

async function start() {
  try {
    await mongoose.connect(mongoUri, { autoIndex: true, dbName: "CRUD-TESTE" });
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Server is listening on port", port);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
