// models/Deporte.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Deporte = sequelize.define('Deporte', {
  
  nombre: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Deporte', // Especifica explícitamente el nombre de la tabla
});

module.exports = Deporte;
