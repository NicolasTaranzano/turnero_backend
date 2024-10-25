const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Horario');
const Cancha = require('./Cancha');
const Horario = require('./Horario');

const canchaHorario = sequelize.define('CanchaHorario',{
    IdCancha: {
        type: DataTypes.INTEGER,
        references: {
            model: Cancha,  // Modelo al que haces referencia
            key: 'id',       // Columna del modelo Deporte que se utiliza como clave foránea
        }
    },
    IdHorario: {
        type: DataTypes.INTEGER,
        references: {
            model: Horario,  // Modelo al que haces referencia
            key: 'id',       // Columna del modelo Deporte que se utiliza como clave foránea
        }
    },

},{
    timestamps: false,
    tableName : 'CanchaHorario',
});
module.exports = canchaHorario;