/**
 * Use this function to get the mongoDB url and the database name
 * @param {string} url The database url
 * @returns {{mongoURL: string, databaseName: string}} The url and the db name
 */
export function parseMongoURL(url: string): {
  mongoURL: string;
  databaseName: string;
};
