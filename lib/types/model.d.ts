import {
  Collection,
  Filter,
  FindOptions,
  UpdateOptions,
  DeleteOptions,
  InsertOneOptions,
  BulkWriteOptions,
  OptionalId,
  Document,
} from "mongodb";
import { ZodSchema } from "zod";

export default class Model<T extends Document> {
  #schema: ZodSchema<T> | undefined;
  #collection: Collection<T>;
  collectionName: string;

  constructor(schema: ZodSchema<T> | undefined, collectionName: string);

  #getCollection(): Collection<T>;

  #validateSchema(data: unknown): { data: T | null; error: string | false };
  #validatePartialSchema(data: unknown): {
    data: Partial<T> | null;
    error: string | false;
  };
  #validateArraySchema(data: unknown[]): { data: T[]; error: string | false };

  find(
    query?: Filter<T>,
    options?: FindOptions<T>
  ): Promise<{ result: T[]; error: false }>;
  findOne(
    query: Filter<T>,
    options?: FindOptions<T>
  ): Promise<{ result: T | null; error: false }>;
  findById(
    id: string,
    options?: FindOptions<T>
  ): Promise<{ result: T | null; error: false }>;

  insert(
    data: OptionalId<T>,
    options?: InsertOneOptions
  ): Promise<{ result: T | null; error: string | false }>;
  insertMany(
    data: OptionalId<T>[],
    options?: BulkWriteOptions
  ): Promise<{ result: T[] | null; error: string | false }>;

  update(
    query: Filter<T>,
    data: Partial<T>,
    options?: UpdateOptions
  ): Promise<{ result: T | null; error: string | false }>;
  updateById(
    id: string,
    data: Partial<T>,
    options?: UpdateOptions
  ): Promise<{ result: T | null; error: string | false }>;

  delete(
    query: Filter<T>,
    options?: DeleteOptions
  ): Promise<{ result: T | null; error: false }>;
  deleteById(
    id: string,
    options?: DeleteOptions
  ): Promise<{ result: T | null; error: false }>;
}
