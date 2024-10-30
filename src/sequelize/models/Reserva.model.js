const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) => {
    const Reserva = Sequelize.define('Reserva',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        IdUsuario: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuario',
                key: 'id',
            }
        },
        IdCancha:{
            type: DataTypes.INTEGER,
            references:{
                model: 'Cancha',
                key: 'id',
            }
        },
        fecha:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        horario_inicio:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        estado:{
            type: DataTypes.ENUM('Disponible','Reservada'),
            allowNull: false,
        }
    
    },{
        timestamps: false,
        tableName: 'Reserva',
    });
}