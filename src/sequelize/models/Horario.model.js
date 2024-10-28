const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) => {
    const Horario = Sequelize.define('Horario',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        horario: {
            type :DataTypes.TIME,
        },
    },{
        timestamps: false,
        tableName: 'Horario', 
    });
}
