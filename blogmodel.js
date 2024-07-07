const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'devuser' } // Optional reference to User model
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
