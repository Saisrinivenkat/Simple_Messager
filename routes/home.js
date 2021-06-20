const express = require('express');
const router = express.Router()
const Reply = require('../models/replies')
const Post = require('../models/model')
const { checkAuth } = require('../config/auth_middleware')


router.get("/home", checkAuth,async function(req, res){
  try {
    const posts =  await Post.find({});
    res.render("home");

  } catch (error) {
    throw err;
  }
});


router.get("/contact", checkAuth ,function(req, res){
  res.render("contact");
});


//Compose
router.get("/compose" ,checkAuth, function(req, res){
  res.render("compose");
});




router.post("/compose", checkAuth ,async function(req, res){
  const date = new Date()
  const post = new Post({
    user: req.user.name,
    title: req.body.postTitle,
    content: req.body.postBody,
    created: date.toString(),
    likes: 0
  });

  try {
    const saved = await post.save()
    res.redirect("/home")

  } catch (error) {
    res.status(400).send("unable to save to database");
  }
});

router.post('/reply/:postId',(req,res) =>{
  const postId = req.params.postId
  const reply = new Reply({
    post_id: postId,
    user_id: req.user._id,
    name: req.user.name,
    reply: req.body.message,
    created: new Date().toDateString()
  })
  reply.save()
    .then( () =>{
      res.redirect('/posts/'+postId)
    })
    .catch( (err) =>{
      throw err
    } )
})

module.exports = router
