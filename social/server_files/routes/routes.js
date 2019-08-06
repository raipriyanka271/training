
const API=require('../api/api');
const passport=require('passport')
module.exports= app =>{
  app.get('/api/search/:name/:password', API.login);
  app.post('/api/newuser', API.signup);
  app.get('/api/verify/:otp/:email', API.verify);
  app.get('/api/PasswordVerify/:email', API.verifyEmail);
  app.get('/api/passwordReset/:email/:otp', API.passwordReset);
  app.get('/api/changePassword/:email/:password', API.passwordChange);
  app.get('/api/home', passport.authenticate('jwt',{session:false}),API.home);
  app.get('/api/addpost/:content', passport.authenticate('jwt',{session:false}),API.addPost);
}