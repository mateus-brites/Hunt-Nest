import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});
export const BookModel = mongoose.model('books', schema);
