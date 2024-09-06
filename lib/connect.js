import { MongoClient } from "mongodb";

import Database from "./database.js";

import { parseMongoURL } from "./functions.js";

export async function connect(url, callback) {
  const { mongoURL, databaseName } = parseMongoURL(url);

  try {
    const client = new MongoClient(mongoURL);

    await client.connect();

    const db = client.db(databaseName);

    Database.setDB(db);

    callback();
  } catch (error) {
    throw new Error(error);
  }
}
