const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const ReplySchema = {
  post_id: String,
  user_id: String,
  name: String,
  reply: String,
  created: Date
}

const Reply = mongoose.model('Replies',ReplySchema)

module.exports = Reply