import {
  Collection,
  Filter,
  FindOptions,
  UpdateOptions,
  DeleteOptions,
  InsertOneOptions,
  OptionalId,
  Document,
} from "mongodb";
import { ZodSchema } from "zod";

export default class Model<T extends Document> {
  #schema: ZodSchema<T> | undefined;
  #collection: Collection<T>;

  constructor(schema: ZodSchema<T> | undefined, collection: string);

  #validateSchema(data: any): T;
  #validatePartialSchema(data: any): Partial<T>;
  #validateArraySchema(data: any[]): T[];

  find(query?: Filter<T>, options?: FindOptions): Promise<T[]>;
  findOne(query: Filter<T>, options?: FindOptions): Promise<T | null>;
  findById(id: string, options?: FindOptions): Promise<T | null>;

  insert(data: OptionalId<T>, options?: InsertOneOptions): Promise<T>;
  insertMany(data: OptionalId<T>[], options?: InsertOneOptions): Promise<T[]>;

  update(
    query: Filter<T>,
    data: Partial<T>,
    options?: UpdateOptions
  ): Promise<T | null>;
  updateById(
    id: string,
    data: Partial<T>,
    options?: UpdateOptions
  ): Promise<T | null>;

  delete(query: Filter<T>, options?: DeleteOptions): Promise<T | null>;
  deleteById(id: string, options?: DeleteOptions): Promise<T | null>;
}
