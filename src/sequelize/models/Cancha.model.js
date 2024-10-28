const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) => {
    const Cancha = Sequelize.define('Cancha', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        IdDeporte: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Deporte',  
                key: 'id',       
            }
        },
    }, {
        timestamps: false,
        tableName: 'Cancha', 
    });
}
