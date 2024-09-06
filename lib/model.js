import { ObjectId } from "mongodb";
import Database from "./database.js";

export default class Model {
  #schema;
  #collection;

  constructor(schema, collection) {
    this.#schema = schema;
    this.#collection = Database.getDB().collection(collection);
  }

  #validateSchema(data) {
    if (!this.#schema) return data;

    const { data: result, error } = this.#schema.safeParse(data);

    if (error) throw new Error(error.errors[0].message);

    return result;
  }

  #validatePartialSchema(data) {
    if (!this.#schema) return data;

    const { data: result, error } = this.#schema.partial().safeParse(data);

    if (error) throw new Error(error.errors[0].message);

    return result;
  }

  #validateArraySchema(data) {
    if (!this.#schema) return data;

    let validatedData = [];

    for (const object of data) {
      const { data: result, error } = this.#validateSchema(object);

      if (error) throw new Error(error.errors[0].message);

      validatedData.push(result);
    }

    return validatedData;
  }

  async find(query = {}, options = {}) {
    if (query.hasOwnProperty("_id")) return this.findById(query._id, options);

    const data = await this.#collection.find(query, options).toArray();

    return data;
  }

  async findOne(query, options = {}) {
    if (query.hasOwnProperty("_id")) return this.findById(query._id, options);

    const data = await this.#collection.findOne(query, options);

    return data;
  }

  async findById(id, options = {}) {
    const data = await this.#collection.findOne(
      { _id: ObjectId.createFromHexString(id) },
      options
    );

    return data;
  }

  async insert(data, options = {}) {
    const validatedData = this.#validateSchema(data);

    await this.#collection.insertOne(validatedData, options);
    return validatedData;
  }

  async insertMany(data, options = {}) {
    const validatedData = this.#validateArraySchema(data);

    await this.#collection.insertMany(validatedData, options);
    return validatedData;
  }

  async update(query, data, options = {}) {
    if (query.hasOwnProperty("_id"))
      return this.updateById(query._id, data, options);

    const validatedData = this.#validatePartialSchema(data);

    const result = await this.#collection.findOneAndUpdate(
      query,
      { $set: validatedData },
      { ...options }
    );
    return result;
  }

  async updateById(id, data, options = {}) {
    const validatedData = this.#validatePartialSchema(data);

    await this.#collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: validatedData },
      options
    );
    return validatedData;
  }

  async delete(query, options = {}) {
    if (query.hasOwnProperty("_id")) return this.deleteById(query._id, options);

    return await this.#collection.findOneAndDelete(query, options);
  }

  async deleteById(id, options = {}) {
    return await this.#collection.findOneAndDelete(
      { _id: ObjectId.createFromHexString(id) },
      options
    );
  }
}
