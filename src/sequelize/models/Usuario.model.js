const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) => {
  const Usuario = Sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
      unique: true, 
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('Cliente','Administrador'),
      allowNull: false,
      defaultValue: 'Cliente',
    },
  }, {
    timestamps: false, 
    tableName: 'Usuario',
  });
}
