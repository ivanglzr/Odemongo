import Database from "./lib/database.js";
import Model from "./lib/model.js";

import { ObjectIdSchema } from "./lib/schemas/index.js";

const schemas = {
  ObjectIdSchema,
};

export { Database, Model, schemas };
