require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require('passport')
const flash = require("express-flash")
const session = require("express-session")


//DB connection
const mongo_uri = process.env.MONGODB_URI || "mongodb:localhost:27017/test";

mongoose.connect(mongo_uri, {useNewUrlParser: true , useUnifiedTopology: true})
mongoose.connection.once('open', () => console.log("Connected"))
                    .on('npm ierror' , ()=> { console.log('Error') })


//OAuth
const UserAuth = require('./user_auth')
UserAuth(passport)

//Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Session
app.use(session({
  secret:process.env.SECRET || 'secret',
  saveUninitialized:false,
  resave:false
}))

app.use(passport.initialize())
app.use(passport.session())

//Flash
app.use(flash())

//Routes
const regisrouter= require('./routes/register')
const indexrouter= require('./routes/index')
const homeRouter = require('./routes/home')
const postRouter = require('./routes/post');


app.use('/',regisrouter);
app.use(indexrouter);
app.use(homeRouter);
app.use('/posts',postRouter);

app.get('/logout', (req,res) =>{
  req.logOut()
  res.redirect('/login');
})

// //Invalid Routes
// app.get('*' , (req,res) =>{
//   req.logOut()
//   res.render('404.ejs')
// })


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
