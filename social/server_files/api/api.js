const services = require('../services/services');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var salt = 10;
var passport = require('passport')
var cfg = require("../config.js");
var jwt = require("jwt-simple");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'imraipriyanka@gmail.com',
        pass: 'rajeshroy88'
    }
});
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'MyS3cr3tK3Y';
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    services.getId(jwt_payload.user_id).then((getId) => {
        if (getId.rowCount == 1) {
            return done(null, getId.rows[0])
        }
        else {
            return done(null, false)
        }
    }).catch((err) => {
        return done(err, false)
    })
}))

exports.home = (req, res) => {
    services.getPost().then((posts) =>{
        console.log(posts.rows)
        res.send(posts.rows)
    })
}

exports.addPost = (req, res) => {
    // console.log("here============>",req.params.content);
    services.addPost(req.user.userid,req.params.content).then((posts) =>{
        console.log(posts.rows)
        res.send(posts.rows[0])
    })
}

exports.login = (req, res) => {
    services.checkEmail(req.params.name).then((emailChecked) => {
        if (emailChecked.rowCount !== 0) {
            let password = emailChecked.rows[0].password;
            bcrypt.compare(req.params.password, password, function (err, result) {
                if (result == true) {
                    services.login(req.params.name, password).then((userFound) => {
                        if (userFound.rowCount === 0) {
                            res.status(404).send("no-user");
                        } else {
                            services.checkStatus(req.params.name).then((statusChecked) => {
                                if (statusChecked.rowCount === 0) {
                                    res.send("status-false")
                                }
                                else {
                                    let payload = {
                                        user_id: userFound.rows[0].userid

                                    }
                                    var token = jwt.encode(payload, cfg.jwtSecret);
                                    res.send(token)
                                }
                            })
                        }
                    })
                }
                else {
                    res.send("no-user")
                }
            })

        }
        else {
            res.send("not-allowd")
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
}

exports.signup = (req, res) => {
    let otp = Math.floor((Math.random() * 9000) + 1000)
    services.checkEmail(req.body.values.email).then((emailChecked) => {
        if (emailChecked.rowCount == 0) {
            bcrypt.hash(req.body.values.password, salt, (err, encrypted) => {
                req.body.values.password = encrypted
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
            })
        }
        else {
            res.send("not-allowd")
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.verify = (req, res) => {
    services.verify(req.params.otp, req.params.email).then((userFound) => {
        if (userFound.rowCount === 0) {
            res.status(404).send("no-otp");
        } else {
            services.revertStatus(req.params.email).then((statusChecked) => {
                res.send(statusChecked.rows[0]);
            })
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.verifyEmail = (req, res) => {

    let otp = Math.floor((Math.random() * 9000) + 1000)
    services.checkEmail(req.params.email).then((emailChecked) => {
        if (emailChecked.rowCount !== 0) {
            services.checkStatus(req.params.email).then((userFound) => {

                if (userFound.rowCount !== 0) {
                    services.newPassword(req.params.email, otp).then((inserted) => {

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
                        res.send("inserted")
                    })
                }
                else {
                    res.send("status-false")
                }
            })
        } else {
            res.send("no-user")
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.passwordReset = (req, res) => {

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
    bcrypt.hash(req.params.password, salt, (err, encrypted) => {
        req.params.password = encrypted
        services.passwordChange(req.params.email, req.params.password).then((userFound) => {
            res.send(userFound);
        }).catch(function (error) {
            res.status(500).send(error);
        });
    })
}







