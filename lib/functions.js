export function parseMongoURL(url) {
  if (!url) throw new TypeError("You must introduce an URL");

  const regex = /^(mongodb:\/\/[^\/]+)\/(.+)$/;
  const matches = url.match(regex);

  if (!matches || matches.length < 3) {
    throw new Error("Invalid MongoDB URL");
  }

  const mongoURL = matches[1];
  const databaseName = matches[2];

  return { mongoURL, databaseName };
}
