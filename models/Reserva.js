const { DataTypes, DatabaseError } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Cancha = require('./Cancha');

const Reserva = sequelize.define('Reserva',{
    IdUsuario: {
        type: DataTypes.INTEGER,
        references:{
            model: Usuario,
            key: 'id',
        }
    },
    IdCancha: {
        type: DataTypes.INTEGER,
        references:{
            model: Cancha,
            key: 'id',
        }
    },
    fecha:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_inicio:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_fin:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado:{
        type: DataTypes.ENUM('Confirmada','Cancelada','Finalizada'),
        allowNull: false,
    }

},{
    timestamps: false,
    tableName: 'Reserva',
});

module.exports = Reserva;