const express = require('express');
const router = express.Router()
const Post = require('../models/model')

router.get("/compose", function(req, res){
  res.render("compose");
});

router.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save().then(msg =>{ console.log('post Saved');res.redirect("/")})
  .catch(err => {res.status(400).send("unable to save to database");});
});

module.exports = router