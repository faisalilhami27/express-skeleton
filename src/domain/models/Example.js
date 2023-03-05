const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const Schema = mongoose.Schema;
const COLLECTION = 'collection_name';

const ExampleSchema = new Schema({
  field1: { type: ObjectId, ref: 'ref_collection_name' }, // ref to another collection like join table in mysql
  field2: { type: String },
}, {
  collection: COLLECTION,
  versionKey: false,
  strict: false
})

module.exports = mongoose.model(COLLECTION, ExampleSchema)
