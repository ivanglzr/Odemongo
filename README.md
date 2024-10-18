# Odemongo

**Odemongo** is an **ODM** for MongoDB. \
It allows you to work with multiple databases with a custom model.

# Usage

## 1. Connect to MongoDB

**Odemongo** brings a you a class that you can use to connect to a DB. \

```
import { Database } from "odemongo"

const db = new Database(mongodb_url)

await db.connect()
```

## 2. Create your model

A model allows to you to interact with an especific database and an especific collection. \
It also allows you to validate data with zod. \
Just by passing a zod schema odemongo will validate it and in case of error it will return it.

```
import { Model } from "odemongo"

const YOUR_MODEL = new Model(db, zod_schema, collection_name)
```

## 3. Interact with your model

Now you can use all of the functions that **Odemongo** brings you with your model. \
All the functions that receive data return an object with a result and an error and are asynchronous. \
The find functions only return a result. \
If there is a validation error the message will be in error and result will be null. \
If validation is correct result will contain all the data and error will be false. \
Options are all the default options that the MongoDB NodeJS driver has.

### Model.find(query?, options?)

```
const { result } = await Model.find()
```

Result is an array

### Model.findOne(query, options?)

```
const { result } = await Model.findOne({ name: "John Doe" })
```

Result is an object

### Model.findById(id, options?)

```
const { result } = await Model.findById(id)
```

Id must be an string that is 24 characters long, **Odemongo** will turn it into an ObjectId. \
Result is an object

### Model.insert(object, options?)

```
const { result, error } = await Model.insert({ name: "John Doe" })
```

The object will be validated before inserting in the collection. \
Result is the inserted object

### Model.insertMany(array, options?)

```
const { result, error } = await Model.insertMany([{ name: "John doe" }])
```

The objects in the array will be validated before inserting them. \
Result is the inserted array

### Model.update(query, object, options?)

```
const { result, error } = await Model.update({ name: "John Doe" }, { name: "John Doe 2" })
```

The object will be partially validated, if the query doesn't match any object in the DB it will return null. \
Result is the updated object

### Model.updateById(id, object, options?)

```
const { result, error } = await Model.updateById(id, { name: "John Doe 2" })
```

Same as update but the query is now an object. \
Result is the updated object

### Model.delete(query, options?)

```
const { result, error } = await Model.delete({name: "John Doe"})
```

If query doesn't match any object result will be null. \
Result is the deleted object.

### Model.deleteById(id, options?)

```
const { result, error } = await Model.deleteById(id)
```

Same as delete but query is an id. \
Result is the deleted object.

# Schemas

**Odemongo** brings you some default zod schemas to work with specific data

```
import { schemas } from "odemongo"
```

## ObjectIdSchema

```
import { z } from "zod"
import { schemas } from "odemongo"

const userSchema = z.object({
    name: z.string(),
    someId: schemas.ObjectIdSchema
})
```

This allows you to add custom ids to your schemas

Created by _@ivanglzr_
