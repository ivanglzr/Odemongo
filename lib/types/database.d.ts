import { Db } from "mongodb";

/**
 * Database class for managing the MongoDB connection.
 */
declare class Database {
  #db: Db | null;
  #uri: string | null;

  /**
   * Creates an instance of Database.
   *
   * @param {string} uri The MongoDB connection URI.
   */
  constructor(uri: string);

  /**
   * Connects to the MongoDB database.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  connect(): Promise<void>;

  /**
   * Retrieves the connected database instance.
   *
   * @returns {Db} The MongoDB database instance.
   * @throws {Error} If the connection is not established.
   */
  getDB(): Db;
}

export default Database;
