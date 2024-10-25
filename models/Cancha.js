const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Deporte = require('./Deporte');

const Cancha = sequelize.define('Cancha', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IdDeporte: {
        type: DataTypes.INTEGER,
        references: {
            model: Deporte,  // Modelo al que haces referencia
            key: 'id',       // Columna del modelo Deporte que se utiliza como clave foránea
        }
    },
}, {
    timestamps: false,
    tableName: 'Cancha', // Especifica explícitamente el nombre de la tabla
});

module.exports = Cancha;