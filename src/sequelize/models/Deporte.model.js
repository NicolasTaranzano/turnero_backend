const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) => {
  const Deporte = Sequelize.define('Deporte', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Deporte', 
  });
}


