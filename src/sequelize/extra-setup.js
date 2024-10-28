function applyExtraSetup(sequelize) {
	const { Cancha, CanchaHorario, Deporte, Horario, Reserva, Usuario } = sequelize.models;
    
    Cancha.hasMany(Reserva, { foreignKey: 'IdCancha' });
    Reserva.belongsTo(Cancha, { foreignKey: 'IdCancha' });

    Usuario.hasMany(Reserva, { foreignKey: 'IdUsuario' });
    Reserva.belongsTo(Usuario, { foreignKey: 'IdUsuario' });

    Cancha.belongsToMany(Horario, { through: 'CanchaHorario', foreignKey: 'IdCancha' });

    Deporte.hasMany(Cancha, { foreignKey: 'IdDeporte' });
    Cancha.belongsTo(Deporte, { foreignKey: 'IdDeporte' });
}

module.exports = { applyExtraSetup };
