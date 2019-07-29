
const API=require('../api/api');

module.exports= app =>{
  app.get('/api/search/:name/:password', API.login);
  app.post('/api/newuser', API.signup);
  app.get('/api/verify/:otp/:email', API.verify);
  app.get('/api/PasswordVerify/:email', API.verifyEmail);
  app.get('/api/passwordReset/:email/:otp', API.passwordReset);
  app.get('/api/changePassword/:email/:password', API.passwordChange);
}