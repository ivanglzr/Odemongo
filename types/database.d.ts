import { Db } from "mongodb";

export class Database {
  private static db: Db;

  static setDB(db: any): void;

  static getDB(): any;
}
