const express = require('express')
const app = express()
const port = 5000
app.use(express.json());
var DateDiff = require('date-diff');
const url = require('url');
const querystring = require('querystring');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userdb', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected");
});

var Schema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    address: { type: String },
    profession: { type: String },
    age: { type: Number }
  })


var user = db.model('userdata', Schema);
function getuuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
};
function findage(dob) {
  console.log(dob)
  let current
  let date1 = new Date();
  var date2 = new Date(dob);
  let diff = new DateDiff(date1, date2);
  console.log(date1);
  console.log(date2);
  let result = diff.years();
  return Math.floor(result);

}
app.post('/create', (req, res) => {
  user.create({
    userId: getuuid(),
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    profession: req.body.profession,
    age: findage(req.body.dob)

  }, function (err, response) {
    if (err) {
      console.log(err);
      res.status(500).send("Could not create user")
    }
    else {
      res.send('Inserted');
    }
  });
  

});

app.get('/find/:id', (req, res) => {
  user.find({
    userId: req.params.id
  }, function (err, response) {
    if (err) {
      console.log(err);
    }
    else {
      if(response.length===0)res.status(404).send("User does not exist");
      else{
      res.send(response);
      }
    }
  });
});


app.get('/filterage/:age', (req, res) => {
  user.find({ age: { $gte: req.params.age } }, function (err, response) {
    if (err) {
      console.log(err);
      res.send("could not connect");
    }
    else {
      if(response.length===0)res.status(400).send("User does not exist");
      else{
      res.send(response);
    }
  };
});
})



app.get('/filtername/:name', (req, res) => {
  user.find({
    name: req.params.name
  }, function (err, response) {
    if (err) {
      console.log(err);
      res.status(400).send("could not connect")
    }
    else {
      if(response.length===0)res.status(404).send("User does not exist");
      else{
      res.send(response);
    }
   } });
});


app.get('/filterprof/:profession', (req, res) => {
  user.find({
    profession: req.params.profession
  }, function (err, response) {
    if (err) {
      console.log(err);
      res.send("could not connect")
    }
    else {
      if(response.length===0)res.status(404).send("User does not exist");
      else{
      res.send(response);
    }}
  });
});


app.get('/filtercity/:address', (req, res) => {
  user.find({
    address: { $regex: req.params.address, $options: 'i' }
  }, function (err, response) {
    if (err) {
      console.log(err);
      res.send("could not connect")
    }
    else {
      if(response.length===0)res.status(404).send("User does not exist");
      else{
      res.send(response);
    }}
  });
});


app.get('/filtergender/:gender', (req, res) => {
  user.find({
    gender: req.params.gender
  }, function (err, response) {
    if (err) {
      console.log(err);
      res.send("could not connect")
    }
    else {
      if(response.length===0)res.status(404).send("User does not exist");
      else{
      res.send(response)
    }}
  });
});

app.get('/update/:id', (req, res) => {
  var obj = {
    userId: req.params.id,
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    profession: req.body.profession,

  }
  user.findOneAndUpdate({ userId: req.params.id }, obj)
    .then((user) => {
      console.log(user)
      res.send(user)
    })

});
app.get('/search/', (req, res) => {
  let searchQuery=req.query;
  let obj={};
 if(searchQuery.hasOwnProperty('name'))
  obj={...obj,name:{$regex:searchQuery.name}}
  if(searchQuery.hasOwnProperty('age'))
    obj={...obj,age:parseInt(searchQuery.age)}
  if(searchQuery.hasOwnProperty('profession'))
  obj={...obj,profession:searchQuery.profession}
  if(searchQuery.hasOwnProperty('gender'))
  obj={...obj,gender:searchQuery.gender}
  console.log(obj)

  user.find(obj, function (err, response) {
     if (err) {
       console.log(err);
       res.send("could not connect")
     }
     else {
       if(response.length===0)res.status(404).send("User does not exist");
       else{
       res.send(response);
     }}
   });
})

app.get('/delete/:id', (req, res) => {
  user.deleteOne({ userId: req.params.id }, function (err) {
    if (err) {
      console.log(err);
      res.status(404).send("user does not exist!")
    } else
    res.send("Deleted!")
  });
});

app.listen(port)
