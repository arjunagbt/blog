const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  article: {type: Schema.Types.ObjectId, ref: 'Article'},
  comment_body: String,
  createdAt: Date
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment