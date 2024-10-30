function applyExtraSetup(sequelize) {
	const { Cancha, Deporte, Reserva, Usuario } = sequelize.models;

    Usuario.hasMany(Reserva, { foreignKey: 'IdUsuario' });
    Reserva.belongsTo(Usuario, { foreignKey: 'IdUsuario' });

    Deporte.hasMany(Cancha, { foreignKey: 'IdDeporte' });
    Cancha.belongsTo(Deporte, { foreignKey: 'IdDeporte' });

    Cancha.hasMany(Reserva, { foreignKey: 'IdCancha' });
    Reserva.belongsTo(Cancha, { foreignKey: 'IdCancha' });
}

module.exports = { applyExtraSetup };
