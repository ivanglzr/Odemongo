import { z } from "zod";
import { ObjectId } from "mongodb";

export const ObjectIdSchema = z
  .string()
  .length(24)
  .refine((val) => ObjectId.isValid(val))
  .transform((val) => ObjectId.createFromHexString(val));
