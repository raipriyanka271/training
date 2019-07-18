var mongoose = require('mongoose');
const uuid=require('uuid/v4');
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


exports.createUser = () => {
    user.create({
        userId: uuid(),
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        profession: req.body.profession,
        age: findage(req.body.dob)
    }, function (err, response) {
        return response;
    });
}

exports.findUser = () => {
    user.find({
        userId: req.params.id
    }, function (err, response) {
        return response;
    });
}
exports.filterByAge = () => {
    user.find({ age: { $gte: req.params.age } }, function (err, response) {
        return response;
    });
}
exports.filterByName = () => {
    user.find({
        name: req.params.name
    }, function (err, response) {
        return response;
    });
};
exports.filterByProf = () => {
    user.find({
        profession: req.params.profession
    }, function (err, response) {
        return response;
    });
};
exports.filterByCity = () => {
    user.find({
        address: { $regex: req.params.address, $options: 'i' }
    }, function (err, response) {
        return response;
    });
};
exports.filterByGender = () => {
    user.find({
        gender: req.params.gender
    }, function (err, response) {
        return response;
    });
}
exports.updateById = () => {
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

            return user;
        });
};

exports.search = () => {
    let searchQuery = req.query;
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

    user.find(obj, function (err, response) {
        return response;
    });
};
exports.deleteById = (req, res) => {
    user.deleteOne({ userId: req.params.id },
        function (err, response) {
            return response;
        });
};
