const services = require('../services/services');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'imraipriyanka@gmail.com',
        pass: 'rajeshroy88'
    }
});

exports.login = (req, res) => {
    console.log(req.params.name)
    services.login(req.params.name, req.params.password).then((userFound) => {
        if (userFound.rowCount === 0) {
            res.status(404).send("no-user");
        } else {
            res.send(userFound.rows[0]);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.signup = (req, res) => {
    let otp = Math.floor((Math.random() * 9000) + 1000)
    services.checkEmail(req.body.values.email).then((emailChecked) => {
        if (emailChecked.rowCount == 0) {
            services.signup(req.body, otp).then((userCreated) => {
                const mailOptions = {
                    from: 'imraipriyanka@gmail.com',
                    to: req.body.values.email,
                    subject: 'OTP FOR EMAIL VERIFICATION',
                    html: ' <p> OTP FOR VERIFICATION IS ' + otp + ' </p>'
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });
                res.send(userCreated);
            })
        } else {
            res.send("not-allowd")
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });


};

exports.verify = (req, res) => {
    services.verify(req.params.otp, req.params.email).then((userFound) => {
        if (userFound.rowCount === 0) {
            res.status(404).send("otp does not match");
        } else {
            res.send(userFound.rows[0]);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.verifyEmail = (req, res) => {
    let otp = Math.floor((Math.random() * 9000) + 1000)
    services.verifyEmail(req.params.email).then((userFound) => {
        if (userFound.rows !== 0) {
            const mailOptions = {
                from: 'imraipriyanka@gmail.com',
                to: req.params.email,
                subject: 'OTP FOR EMAIL VERIFICATION',
                html: ' <p> OTP FOR VERIFICATION IS ' + otp + ' </p>'
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });
        }
        services.newPassword(req.params.email, otp).then((inserted) => {
            res.send("inserted")
        })
        res.send(userFound.rows[0])
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.passwordReset = (req, res) => {
    console.log(req.params.email);
    console.log(req.params.otp)
    services.passwordReset(req.params.email, req.params.otp).then((userFound) => {
        if (userFound.rowCount === 0) {
            res.status(404).send("no-otp");
        } else {
            res.send(userFound.rows[0]);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
}

exports.passwordChange = (req, res) => {
    console.log(req.params.email);
    console.log(req.params.password)
    services.passwordChange(req.params.email, req.params.password).then((userFound) => {
        res.send(userFound);
    }).catch(function (error) {
        res.status(500).send(error);
    });
}







