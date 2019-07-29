const sequelize = require('databse.js');


const Register = sequelize.define('register_user',{
id:{
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull : false,
primaryKey : true 
},
firstname:{
type: Sequelize.STRING,
allowNull : false
},
lastname:{
type: Sequelize.STRING,
allowNull: false
},
useremail:{
type: Sequelize.STRING,
allowNull: false
},
username: {
type: Sequelize.STRING,
allowNull : false
},
userpassword: {
type: Sequelize.STRING,
allowNull : false
},
userdob:{
type: Sequelize.DATE,
allowNull: false
}
});

module.exports = Register;