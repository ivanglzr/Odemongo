import Database from "./database.js";

export default class Model {
  constructor(schema, collection) {
    this.schema = schema;
    this.collection = Database.getDB().collection(collection);
  }

  #validateSchema(data) {
    if (!this.schema) return data;

    const { data: result, error } = this.schema.safeParse(data);

    if (error) throw new Error(error.errors[0].message);

    return result;
  }

  async insert(data) {
    const validatedData = this.#validateSchema(data); // Validar y modificar los datos si es necesario

    await this.collection.insertOne(validatedData);
    return validatedData; // Retorna los datos validados/modificados
  }

  async find(query = {}, options = {}) {
    const data = await this.collection.find(query, options).toArray();

    return data;
  }

  async findOne(query, options = {}) {
    const data = await this.collection.findOne(query, options);

    return data;
  }

  async findById(id, options = {}) {
    const data = await this.collection.findOne({ _id: id }, options);

    return data;
  }

  //TODO: finish all methods
}
