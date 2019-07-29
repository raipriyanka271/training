
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Socialmedia',
    password: 'rajeshroy88',
    port: 5432,
})
client.connect().then((err) => {
    console.log("Connected");
})

exports.checkEmail = (email) => {
    return client.query('Select * from  public."users" where email=' + '\'' + email +  '\'')
}

exports.login = (id, password) => {
    return client.query('Select * from  public."users" where email=' + '\'' + id + '\'' + 'AND password=' + '\'' + password + '\'')
}
exports.signup = (body, otp) => {
    console.log(body.values.name)
    return client.query('INSERT INTO public.signup (name, email, password, dob,otp) VALUES (' + '\'' + body.values.name + '\',\'' + body.values.email + '\',\'' + body.values.password + '\',\'' + body.values.dob + '\',' + otp + ')');
}

exports.verify = (otp, email) => {
    return client.query('Select * from  public."signup" where otp=' + parseInt(otp) + ' AND email=' + '\'' + email + '\'')
}

exports.verifyEmail = (email) => {
    return client.query('Select * from  public."users" where email=' + '\'' + email + '\'')
}

exports.newPassword = (email, otp) => {
    return client.query('INSERT INTO public."recoverPassword" (email,otp) VALUES (' + '\'' + email + '\',' + otp + ')')
}

exports.passwordReset = (email, otp) => {
    return client.query('Select * from  public."recoverPassword" where otp =' + parseInt(otp) + ' AND email=' + '\'' + email + '\'')
}

exports.passwordChange = (email, password) => {
    return client.query('UPDATE public.users SET password = ' + '\'' + password + '\' WHERE email=' + '\'' + email + '\'')
}