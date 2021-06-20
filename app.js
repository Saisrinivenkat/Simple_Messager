require('dotenv').config()
const express = require("express");
const app = express();
const path =require('path')
const mongoose = require('mongoose')
const ejs = require("ejs"); 
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require("express-flash")
const session = require("express-session")


//DB connection
const mongo_uri = process.env.MONGODB_URI ||  "mongodb://localhost/testDB";

mongoose.connect(mongo_uri, {useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection.once('open', () => console.log("Connected"))
                    .on('npm ierror' , ()=> { console.log('Error') })


//OAuth
const UserAuth = require('./user_auth')
UserAuth(passport)

//Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Flash
app.use(flash())
//Session
app.use(session({
  secret: 'secret',
  saveUninitialized:false,
  resave:false
}))

app.use(passport.initialize())
app.use(passport.session())

//ejs
app.use(expressLayouts)
app.set('layout','./layouts/head_foot')
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Routes
const regisrouter= require('./routes/register')
const homeRouter = require('./routes/home')
const postRouter = require('./routes/post');


app.use('/',regisrouter);
app.use(homeRouter);
app.use('/posts',postRouter);

app.get('/logout', (req,res) =>{
  req.logOut()
  res.redirect('/login');
})


app.listen(process.env.PORT || 5000, function() {
  console.log("Server started on port 5000");
});
    