//Check Auth
function checkAuth(req,res,next){
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checknotAuth(req,res,next){
  if (req.isAuthenticated()) {
    return res.redirect('/home')
  }
  next()
}

module.exports = {
  checkAuth: checkAuth,
  checknotAuth:checknotAuth
}