const express = require('express');
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { checknotAuth } = require('../config/auth_middleware')

//router.use(checknotAuth)

router.get("/",checknotAuth, function(req, res){
  res.render("register");
});

router.post("/",checknotAuth ,async function(req, res){
  try {
    const password = await bcrypt.hash(req.body.password,10)
    const post = new User({
      email: req.body.email,
      name: req.body.name,
      password : password
    });
  
  
    post.save().then(msg =>{ res.redirect("/login")})
    .catch(err => {res.status(400).send("unable to save to database");});
  } catch (error) {
    console.log('Error')
    res.status(400).send("Error On server")
  }
  
});

module.exports = router
