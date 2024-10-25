const Cancha = require('./models/Cancha');
const Deporte = require('./models/Deporte');
const Reserva = require('./models/Reserva');
const Usuario = require('./models/Usuario');
const Horario = require('./models/Horario');
const CanchaHorario = require('./models/CanchaHorario');

// Definir las asociaciones
Deporte.hasMany(Cancha, {
    foreignKey: 'IdDeporte', // Nombre de la columna en Cancha que referencia a Deporte
    sourceKey: 'id'           // Columna en Deporte que se usa para la referencia
});

Cancha.belongsTo(Deporte, {
    foreignKey: 'IdDeporte', // Nombre de la columna en Cancha que referencia a Deporte
    targetKey: 'id'           // Columna en Deporte que se usa para la referencia
});
Usuario.hasMany(Reserva, {
    foreignKey: 'IdUsuario', // La clave foránea en Reserva
    sourceKey: 'id', // La clave primaria en Usuario
  });

  
  // Una reserva pertenece a un usuario
  Reserva.belongsTo(Usuario, {
    foreignKey: 'IdUsuario', // La clave foránea en Reserva
    targetKey: 'id', // La clave primaria en Usuario
  });
  
  // Una cancha puede tener muchas reservas
  Cancha.hasMany(Reserva, {
    foreignKey: 'IdCancha', // La clave foránea en Reserva
    sourceKey: 'id', // La clave primaria en Cancha
  });
  
  // Una reserva pertenece a una cancha
  Reserva.belongsTo(Cancha, {
    foreignKey: 'IdCancha', // La clave foránea en Reserva
    targetKey: 'id', // La clave primaria en Cancha
  });
  CanchaHorario.associate = (models) => {
    CanchaHorario.belongsTo(Cancha, {
      foreignKey: 'IdCancha',
      onDelete: 'CASCADE', // Elimina las asociaciones si se elimina la cancha
    });
    CanchaHorario.belongsTo(Horario, {
      foreignKey: 'IdHorario',
      onDelete: 'CASCADE', // Elimina las asociaciones si se elimina el horario
    });
  };
  Cancha.associate = (models) => {
    Cancha.belongsToMany(Horario, {
      through: models.CanchaHorario,
      foreignKey: 'IdCancha', // Clave foránea en la tabla intermedia
      otherKey: 'IdHorario',   // Clave foránea del otro modelo en la tabla intermedia
    });

  };
  Horario.associate = (models) => {
    Horarios.belongsToMany(Cancha, {
      through: models.CanchaHorarios,
      foreignKey: 'IdHorario',  // Clave foránea en la tabla intermedia
      otherKey: 'IdCancha',      // Clave foránea del otro modelo en la tabla intermedia
    });
  };

   
// Exportar los modelos
module.exports = {
    Cancha,
    Deporte,
    Reserva,
    Usuario,
    Horario,
    CanchaHorario,

};
