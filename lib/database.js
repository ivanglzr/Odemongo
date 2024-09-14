import { MongoClient } from "mongodb";
import { parseMongoURL } from "./functions.js";

export default class Database {
  static #db = null;

  static async connect(url, callback) {
    const { mongoURL, databaseName } = parseMongoURL(url);

    const client = new MongoClient(mongoURL);
    await client.connect();

    Database.#db = client.db(databaseName);

    if (callback) callback();

    return Database.#db;
  }

  static getDB() {
    if (!Database.#db) {
      throw new Error(
        "Connection not established, please connect to the database first"
      );
    }

    return Database.#db;
  }
}
