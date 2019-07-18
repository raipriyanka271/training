const services = require('../services/services');
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
  exports.createNewUser = (req, res) => {
    services.createUser().then((userCreated) => {
        if (userCreated.length === 0) res.status(404).send("User does not exist");
        else {
            res.send("Inserted");
        }
    })
};
exports.findUser = (req, res) => {
    services.findUser().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.filterByAge = (req, res) => {
    const result = services.filterByAge().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.filterByName = (req, res) => {
    const result = services.filterByName().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};

exports.filterByProf = (req, res) => {
    const result = services.filterByProf().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.filterByCity = (req, res) => {
    const result = services.filterByCity().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.filterByGender = (req, res) => {
    const result = services.filterByGender().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.updateById = (req, res) => {
    services.updateById().then((userUpdated) => {
        if (userUpdated.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.search = (req, res) => {
    services.search().then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    })
};
exports.deleteById = (req, res) => {
    services.deleteById().then((userDeleted) => {
        if (userDeleted.length === 0) res.status(404).send("User does not exist");
        else {
            res.send("User Deleted");
        }
    })
};







