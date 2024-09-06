import { Db } from "mongodb";

export default class Database {
  private static #db: Db;

  static async connect(url: string, callback: () => void): Promise<void>;

  static getDB(): Db;
}
