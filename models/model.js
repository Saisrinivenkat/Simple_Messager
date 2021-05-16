const mongoose = require('mongoose')

const mongo_uri = process.env.MONGODB_URI || "mongodb://localhost/testDB";

mongoose.connect(mongo_uri, {useNewUrlParser: true});
mongoose.connection.once('open', () => console.log("Connected"))
                    .on('error' , ()=> { console.log('Error') })
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


module.exports = Post;