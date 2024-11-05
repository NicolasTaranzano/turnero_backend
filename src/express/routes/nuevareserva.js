const { models } = require('../../sequelize');

async function reservar(req, res) {
    // Asegúrate de que el nombre de las variables coincida exactamente con las propiedades del cuerpo de la solicitud
    const { IdCancha, fecha, horario_inicio, IdUsuario } = req.body; // Cambié Horario a horario_inicio

    // Comprobar si todos los campos son obligatorios
    if (!IdCancha || !fecha || !horario_inicio || !IdUsuario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Crear una nueva reserva
        const nuevaReserva = await models.Reserva.create({
            IdCancha,
            fecha,
            horario_inicio, // Usar horario_inicio aquí también
            IdUsuario,
        });

        return res.status(201).json({ message: 'Reserva realizada con éxito', reserva: nuevaReserva });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        return res.status(500).json({ message: 'Error interno del servidor al crear la reserva' });
    }
}

module.exports = {
    reservar,
};
