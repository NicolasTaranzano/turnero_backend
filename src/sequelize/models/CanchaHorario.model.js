const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) => {
    const canchaHorario = Sequelize.define('CanchaHorario',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        IdCancha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cancha',  
                key: 'id',      
            }
        },
        IdHorario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Horario',  
                key: 'id',   
            }
        },
        estado: {
            type: DataTypes.ENUM('Libre', 'Ocupada'),
            allowNull: false,
        }
    },{
        timestamps: false,
        tableName : 'CanchaHorario',
    });
}
