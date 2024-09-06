export class Database {
  static setDB(db) {
    this.db = db;
  }

  static getDB() {
    if (!this.db)
      throw new Error(
        "Connection not established, please connect to the database first"
      );

    return this.db;
  }
}
