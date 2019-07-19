const services = require('../services/services');

  exports.createNewUser = (req, res) => {
      console.log("here")
    services.createUser(req.body).then((userCreated) => {
       
            res.send("Inserted");
        
    }).catch(function(error) {
        res.status(500).send(error);
      });
    
};
exports.findUser = function (req, res) {
    console.log("here")
    services.findUser(req.params.id).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.filterByAge = (req, res) => {
    const result = services.filterByAge(req.params.age).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.filterByName = (req, res) => {
    const result = services.filterByName(req.params.name).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};

exports.filterByProf = (req, res) => {
    const result = services.filterByProf(req.params.proffesion).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.filterByCity = (req, res) => {
    const result = services.filterByCity(req.params.address).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.filterByGender = (req, res) => {
    const result = services.filterByGender(req.params.gender).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.updateById = (req, res) => {
    services.updateById(req.params.id).then((userUpdated) => {
        if (userUpdated.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.search = (req, res) => {
    services.search(req.query).then((userFound) => {
        if (userFound.length === 0) res.status(404).send("User does not exist");
        else {
            res.send(userFound);
        }
    }).catch(function(error) {
        res.status(404).send(error);
      });
};
exports.deleteById = (req, res) => {
    services.deleteById(req.params.id).then((userDeleted) => {
        if (userDeleted.length === 0) res.status(404).send("User does not exist");
        else {
            res.send("User Deleted");
        }
    }).catch(function(error) {
        res.status(500).send(error);
      });
};







