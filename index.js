import Database from "./lib/database.js";

export { Database };
export const connect = Database.connect;

export { default as Model } from "./lib/model.js";

import { ObjectIdSchema } from "./lib/schemas/index.js";

export const schemas = {
  ObjectIdSchema,
};
