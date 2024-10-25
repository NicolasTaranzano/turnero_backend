const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Horario = sequelize.define('Horario',{
    horario :{
        type :DataTypes.STRING,
    },
},{
    timestamps: false,
    tableName: 'Horario', // Especifica explícitamente el nombre de la tabla
})
module.exports = Horario;