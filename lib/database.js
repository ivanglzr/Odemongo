import { MongoClient } from "mongodb";
import { parseMongoURL } from "./functions.js";

export default class Database {
  #db = null;
  #uri = null;

  constructor(uri) {
    this.#uri = uri;
  }

  async connect() {
    const { mongoURL, databaseName } = parseMongoURL(this.#uri);

    const client = new MongoClient(mongoURL);
    await client.connect();

    this.#db = client.db(databaseName);
  }

  getDB() {
    if (!this.#db) {
      throw new Error(
        "Connection not established, please connect to the database first"
      );
    }

    return this.#db;
  }
}
