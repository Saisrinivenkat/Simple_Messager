const express = require('express');
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { checknotAuth } = require('../config/auth_middleware')



router.get("/",checknotAuth, function(req, res){
  res.render("register",{ layout : './layouts/start' });
});

router.post("/",checknotAuth ,async function(req, res){
  try {
    const password = await bcrypt.hash(req.body.password,10)
    const post = new User({
      email: req.body.email,
      name: req.body.name,
      password : password
    });
    const saved = post.save()
    res.redirect("/login")
  } catch (error) {
    res.status(400).send("unable to save to database");
  }
});


router.post("/login",checknotAuth,passport.authenticate('local',{
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash : true 
}));


router.get("/login",checknotAuth,(req,res) =>{
  res.render('login', { layout : './layouts/start' } )
})


module.exports = router
