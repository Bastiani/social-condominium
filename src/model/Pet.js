import mongoose from 'mongoose';

const { Schema } = mongoose;

const Pet = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: false,
    enum: ['cat', 'dog', 'bird'],
    default: 'cat',
  },
});

export default mongoose.model('Pet', Pet);
