const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  article_body: String,
  createdAt: {type: Date, default: new Date()}
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;