
const { Client } = require('pg');

var salt =10;

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
    return client.query('Select * from  public."user" where email=' + '\'' + email +  '\'')
}

exports.login = (id, password) => {
    return client.query('Select * from  public."user" where email=' + '\'' + id + '\'' + 'AND password=' + '\'' + password + '\'')
}

exports.checkStatus = (id) => {
    return client.query('Select * from  public."user" where email=' + '\'' + id + '\'' + 'AND status=' +  true + '');
}

exports.signup = (body, otp) => {
    let name=body.values.first_name+" "+body.values.last_name;
    return client.query('INSERT INTO public.user (name, email, password, dob,otp) VALUES (' + '\'' + name + '\',\'' + body.values.email + '\',\'' + body.values.password + '\',\'' + body.values.dob + '\',' + otp + ')');
}

exports.verify = (otp, email) => {
    return client.query('Select * from  public.user where otp=' + parseInt(otp) + ' AND email=' + '\'' + email + '\'')
}

exports.verifyEmail = (email) => {
    return client.query('Select * from  public."user" where email=' + '\'' + email + '\'')
}

exports.newPassword = (email, otp) => {
    return client.query('UPDATE public.user SET otp = '+ otp + ' WHERE email=' + '\'' + email + '\'')
}

exports.passwordReset = (email, otp) => {
    return client.query('Select * from  public."user" where otp =' + parseInt(otp) + ' AND email=' + '\'' + email + '\'')
}

exports.passwordChange = (email, password) => {
    return client.query('UPDATE public.user SET password = ' + '\'' + password + '\' WHERE email=' + '\'' + email + '\'')
}

exports.revertStatus = (email) => {
    return client.query('UPDATE public.user SET otp = '+ null +' ,status = '  + true + ' WHERE email=' + '\'' + email + '\'')
}

exports.getId = (id) => {
    return client.query('Select * from  public."user" where userid='  + parseInt(id) )
}

exports.getPost =() =>{
    return client.query('Select * from  public."post" ')

}

exports.addPost = (id,content) =>{
    console.log(content)
    console.log(id)
    return client.query('INSERT INTO public.post (user_id,content) VALUES ('+ parseInt(id)  + ', \'' + content + '\')')

}