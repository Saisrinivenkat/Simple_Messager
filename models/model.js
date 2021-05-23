const { toInteger } = require('lodash');
const mongoose = require('mongoose')


const postSchema = {
  user : String,
  title: String,
  content: String,
  likes: Number,
  created : Date
};

const Post = mongoose.model("Post", postSchema);


module.exports = Post;