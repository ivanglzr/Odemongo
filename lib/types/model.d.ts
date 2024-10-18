import {
  Db,
  ObjectId,
  Collection,
  Filter,
  FindOptions,
  FindOneAndUpdateOptions,
  FindOneAndDeleteOptions,
  InsertOneOptions,
  BulkWriteOptions,
  UpdateResult,
  Document,
} from "mongodb";
import { ZodSchema } from "zod";

/**
 * Model class for interacting with a MongoDB collection.
 *
 * @template T The type of documents in the collection.
 */
declare class Model<T extends Document> {
  #db: Db;
  #schema: ZodSchema<T> | null;
  #collection: Collection<T> | null;
  #collectionName: string;

  /**
   * Creates an instance of Model.
   *
   * @param {Db} db The database instance.
   * @param {ZodSchema<T>} schema The Zod schema for validating documents.
   * @param {string} collectionName The name of the collection in the database.
   */
  constructor(db: Db, schema: ZodSchema<T> | null, collectionName: string);

  /**
   * Gets the MongoDB collection.
   *
   * @private
   * @returns {Collection<T>} The MongoDB collection.
   */
  #getCollection(): Collection<T>;

  /**
   * Validates a document against the schema.
   *
   * @param {T} data The document to validate.
   * @returns {{ data: T | null, error: string | false }} The result of the validation.
   * @private
   */
  #validateSchema(data: T): { data: T | null; error: string | false };

  /**
   * Validates a partial document against the schema.
   *
   * @param {Partial<T>} data The partial document to validate.
   * @returns {{ data: Partial<T> | null, error: string | false }} The result of the validation.
   * @private
   */
  #validatePartialSchema(data: Partial<T>): {
    data: Partial<T> | null;
    error: string | false;
  };

  /**
   * Validates an array of documents against the schema.
   *
   * @param {T[]} data The array of documents to validate.
   * @returns {{ data: T[] | null, error: string | false }} The result of the validation.
   * @private
   */
  #validateArraySchema(data: T[]): { data: T[] | null; error: string | false };

  /**
   * Finds documents in the collection.
   *
   * @param {Filter<T>} [query={}] Search filters.
   * @param {FindOptions} [options={}] Search options.
   * @returns {Promise<{ result: T[] }>} The search result.
   */
  find(query?: Filter<T>, options?: FindOptions): Promise<{ result: T[] }>;

  /**
   * Finds a single document in the collection.
   *
   * @param {Filter<T>} query Search filters.
   * @param {FindOptions} [options={}] Search options.
   * @returns {Promise<{ result: T | null }>} The search result.
   */
  findOne(
    query: Filter<T>,
    options?: FindOptions
  ): Promise<{ result: T | null }>;

  /**
   * Finds a document by its ID.
   *
   * @param {string} id The ID of the document.
   * @param {FindOptions} [options={}] Search options.
   * @returns {Promise<{ result: T | null }>} The search result.
   */
  findById(id: string, options?: FindOptions): Promise<{ result: T | null }>;

  /**
   * Inserts a new document into the collection.
   *
   * @param {T} data The document to insert.
   * @param {InsertOneOptions} [options={}] Insert options.
   * @returns {Promise<{ result: T | null }>} The result of the insertion.
   */
  insert(data: T, options?: InsertOneOptions): Promise<{ result: T | null }>;

  /**
   * Inserts multiple documents into the collection.
   *
   * @param {T[]} data The documents to insert.
   * @param {BulkWriteOptions} [options={}] Insert options.
   * @returns {Promise<{ result: T[] | null, error: string | false }>} The result of the insertion.
   */
  insertMany(
    data: T[],
    options?: BulkWriteOptions
  ): Promise<{ result: T[] | null; error: string | false }>;

  /**
   * Updates documents in the collection.
   *
   * @param {Filter<T>} query Search filters for the update.
   * @param {Partial<T>} data Data to update.
   * @param {FindOneAndUpdateOptions} [options={}] Update options.
   * @returns {Promise<{ result: UpdateResult<Document> | null, error: string | false }>} The result of the update.
   */
  update(
    query: Filter<T>,
    data: Partial<T>,
    options?: FindOneAndUpdateOptions
  ): Promise<{ result: UpdateResult<Document> | null; error: string | false }>;

  /**
   * Updates a document by its ID.
   *
   * @param {string} id The ID of the document to update.
   * @param {Partial<T>} data Data to update.
   * @param {FindOneAndUpdateOptions} [options={}] Update options.
   * @returns {Promise<{ result: UpdateResult<Document> | null, error: string | false }>} The result of the update.
   */
  updateById(
    id: string,
    data: Partial<T>,
    options?: FindOneAndUpdateOptions
  ): Promise<{ result: UpdateResult<Document> | null; error: string | false }>;

  /**
   * Deletes documents from the collection.
   *
   * @param {Filter<T>} query Search filters for the deletion.
   * @param {FindOneAndDeleteOptions} [options={}] Delete options.
   * @returns {Promise<{ result: T | null }>} The result of the deletion.
   */
  delete(
    query: Filter<T>,
    options?: FindOneAndDeleteOptions
  ): Promise<{ result: T | null }>;

  /**
   * Deletes a document by its ID.
   *
   * @param {string} id The ID of the document to delete.
   * @param {FindOneAndDeleteOptions} [options={}] Delete options.
   * @returns {Promise<{ result: T | null }>} The result of the deletion.
   */
  deleteById(
    id: string,
    options?: FindOneAndDeleteOptions
  ): Promise<{ result: T | null }>;
}

export default Model;
