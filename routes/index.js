const express = require('express');
const router = express.Router()
const passport = require('passport')
const { checknotAuth } = require('../config/auth_middleware')


router.post("/login",checknotAuth,passport.authenticate('local',{
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash : true 
}));

router.get("/login",checknotAuth,(req,res) =>{
  res.render('index')
})

module.exports = router
