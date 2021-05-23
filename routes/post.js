const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router()
const Post = require('../models/model')
const Reply = require('../models/replies')
const { checkAuth } = require('../config/auth_middleware');
const { post } = require('./home');

router.get('/' , checkAuth , (req,res) => {
  Post.find({},(err,post) =>{
    if(err){
      throw err
    }
    
    res.render('posts',{
      posts: post,
      url : req.url
    })
  })
})



  

router.post('/ilike/:postId'  , (req,res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id : requestedPostId},async (err,post) =>{
    if(err){
      throw err
    }
    
    const presentlikes = { likes : post.likes }
    const updatedlikes = { $set : { likes: post.likes+1 }}

    await Post.updateOne(presentlikes,updatedlikes,function(err, res) {
      if (err) throw err;
    })
    Post.findOne({_id:requestedPostId}, (err,post1) =>{
      res.json({
        like: post1.likes
      })
    })
    
  })
})

router.get("/:postId", checkAuth ,async function(req, res){
  const requestedPostId = req.params.postId;
  let postObj;
  await Post.findOne({_id: requestedPostId}, function(err, post){
    postObj = post
  });
  Reply.find({post_id: requestedPostId}, function(err, replies){
    res.render("post", {
      post:postObj,
      comments: replies
    });
  });
  
});


module.exports = router
