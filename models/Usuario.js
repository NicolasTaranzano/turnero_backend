// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El email debe ser único
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('Cliente','Administrador'),
    allowNull: false,
    defaultValue: 'Cliente', // Valor por defecto "Cliente"
  },
}, {
  timestamps: false, // Elimina los campos `createdAt` y `updatedAt` si no los necesitas
  tableName: 'Usuario',
});


module.exports = Usuario;
