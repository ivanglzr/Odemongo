import { ObjectId } from "mongodb";

export default class Model {
  #db;
  #schema;
  #collectionName;
  #collection;

  constructor(db, schema, collectionName) {
    this.#db = db;
    this.#schema = schema;
    this.#collectionName = collectionName;

    this.#collection = null;
  }

  #getCollection() {
    if (!this.#collection)
      this.#collection = this.#db.getDB().collection(this.#collectionName);

    return this.#collection;
  }

  #validateSchema(data) {
    if (!this.#schema) return { data, error: false };

    const { data: result, error } = this.#schema.safeParse(data);

    if (error) return { data: null, error: error.errors[0].message };

    return { data: result, error: false };
  }

  #validatePartialSchema(data) {
    if (!this.#schema) return { data, error: false };

    const { data: result, error } = this.#schema.safeParse(data);

    if (error) return { data: null, error: error.errors[0].message };

    return { data: result, error: false };
  }

  #validateArraySchema(data) {
    if (!this.#schema) return { data, error: false };

    let validatedData = [];
    let errorMessage = "";

    for (const object of data) {
      const { data: result, error } = this.#validateSchema(object);

      if (typeof error === "string") {
        errorMessage = error;
        break;
      }

      validatedData.push(result);
    }

    return { data: validatedData, error: errorMessage ?? false };
  }

  async find(query = {}, options = {}) {
    if (query.hasOwnProperty("_id")) return this.findById(query._id, options);

    const collection = this.#getCollection();

    const data = await collection.find(query, options).toArray();

    return { result: data };
  }

  async findOne(query, options = {}) {
    if (query.hasOwnProperty("_id")) return this.findById(query._id, options);

    const collection = this.#getCollection();

    const data = await collection.findOne(query, options);

    return { result: data, error: false };
  }

  async findById(id, options = {}) {
    const collection = this.#getCollection();

    const data = await collection.findOne(
      { _id: ObjectId.createFromHexString(id) },
      options
    );

    return { result: data };
  }

  async insert(data, options = {}) {
    const { data: validatedData, error } = this.#validateSchema(data);

    if (error) return { result: null, error };

    const collection = this.#getCollection();

    await collection.insertOne(validatedData, options);

    return { result: validatedData, error: false };
  }

  async insertMany(data, options = {}) {
    const { data: validatedData, error } = this.#validateArraySchema(data);

    if (error) return { result: null, error };

    const collection = this.#getCollection();

    await collection.insertMany(validatedData, options);

    return { result: validatedData, error: false };
  }

  async update(query, data, options = {}) {
    if (query.hasOwnProperty("_id"))
      return this.updateById(query._id, data, options);

    const { data: validatedData, error } = this.#validatePartialSchema(data);

    if (error) return { result: null, error };

    const collection = this.#getCollection();

    const result = await collection.findOneAndUpdate(
      query,
      { $set: validatedData },
      options
    );
    return { result, error: false };
  }

  async updateById(id, data, options = {}) {
    const { data: validatedData, error } = this.#validatePartialSchema(data);

    if (error) return { result: null, error };

    const collection = this.#getCollection();

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: validatedData },
      options
    );
    return { result, error: false };
  }

  async delete(query, options = {}) {
    if (query.hasOwnProperty("_id")) return this.deleteById(query._id, options);

    const collection = this.#getCollection();

    const result = await collection.findOneAndDelete(query, options);

    return { result, error: false };
  }

  async deleteById(id, options = {}) {
    const collection = this.#getCollection();

    const result = await collection.findOneAndDelete(
      { _id: ObjectId.createFromHexString(id) },
      options
    );

    return { result, error: false };
  }
}
