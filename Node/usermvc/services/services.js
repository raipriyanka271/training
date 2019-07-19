var mongoose = require('mongoose');
const uuid=require('uuid/v4');
var DateDiff = require('date-diff');
mongoose.connect('mongodb://127.0.0.1:27017/userdb', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected");
});

function findage(dob) {
    let current
    let date1 = new Date();
    var date2 = new Date(dob);
    let diff = new DateDiff(date1, date2);
    console.log(date1);
    console.log(date2);
    let result = diff.years();
    return Math.floor(result);
  }

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


exports.createUser = (body) => {
    console.log("here")
    return user.create({
        userId: uuid(),
        name: body.name,
        dob: body.dob,
        gender: body.gender,
        address: body.address,
        profession: body.profession,
        age: findage(body.dob)
    });
}

exports.findUser = (params) => {
    console.log("here")
    return user.find({
        userId: params
    })
}

exports.filterByAge = (params) => {
    return user.find({ age: { $gte: params } }, function (err, response) {
         
    });
}
exports.filterByName = (params) => {
    return user.find({
        name:params
    })
};
exports.filterByProf = (params) => {
    return user.find({
        profession: params
    })
}
exports.filterByCity = (params) => {
    return user.find({
        address: { $regex: params, $options: 'i' }
    })
};
exports.filterByGender = (params) => {
    return user.find({
        gender: params
    })
}
exports.updateById = (body) => {
    var obj = {
        userId: body.id,
        name: body.name,
        dob: body.dob,
        gender:body.gender,
        address: body.address,
        profession:body.profession,

    }
    return user.findOneAndUpdate({ userId:  body.id}, obj)
}

exports.search = (body) => {
    let searchQuery = body;
    let obj = {};
    if (searchQuery.hasOwnProperty('name'))
        obj = { ...obj, name: { $regex: searchQuery.name } }
    if (searchQuery.hasOwnProperty('age'))
        obj = { ...obj, age: { $regex: parseInt(searchQuery.age) } }
    if (searchQuery.hasOwnProperty('profession'))
        obj = { ...obj, profession: { $regex: searchQuery.profession } }
    if (searchQuery.hasOwnProperty('gender'))
        obj = { ...obj, gender: { $regex: searchQuery.gender } }
    console.log(obj)

    return user.find(obj)
        
   
};
exports.deleteById = (params) => {
    return user.deleteOne({ userId: params })
}

