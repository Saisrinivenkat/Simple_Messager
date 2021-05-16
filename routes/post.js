const express = require('express');
const router = express.Router()
const Post = require('../models/model')

router.get("/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

module.exports = router