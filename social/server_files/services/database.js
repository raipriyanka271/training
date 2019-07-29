const Sequelize = require('sequelize');
const sequelize=new Sequelize('postgres','postgres','rajeshroy88',{
    dialect:'postgres',
    lost:'localhost'
})

module.exposts=sequelize;