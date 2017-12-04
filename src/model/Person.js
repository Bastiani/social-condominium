import mongoose from 'mongoose';

const { Schema } = mongoose;

const Person = new Schema({
  name: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  pets: {
    type: Schema.ObjectId,
    ref: 'Pet',
    required: false,
  },
});

export default mongoose.model('Person', Person);
