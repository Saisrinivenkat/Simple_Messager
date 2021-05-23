const MyStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
//User model
const User = require('./models/user')

function initialize(passport) {
    const authUser =  (email,password,done) =>{
      User.findOne({ email : email })
        .then(user =>{
          if (!user) {
            return done(null,false,{message: "User doesn't Exists"})
          }
          bcrypt.compare(password,user.password,(err,found)=>{
            if (err) {
              throw err
            }
            if (found) {
              return done(null,user)   
            } else {
              return done(null,false,{message : "Incorrect Credentials"})
            }
          })          
        })
        .catch(err=>{
          throw err
        })
      
    }
    passport.use(new MyStrategy({ usernameField: 'email' },authUser))
    passport.serializeUser((user,done) => { done(null, user.id); })
    passport.deserializeUser((id,done) => { 
      User.findById(id, function(err, user) {
        done(err, user);
    });
  })

}

module.exports = initialize