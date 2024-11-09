const { models } = require('../../sequelize');

async function reservar(req, res) {
    const { IdCancha, fecha, horario_inicio, IdUsuario } = req.body; 

    if (!IdCancha || !fecha || !horario_inicio || !IdUsuario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const existingReserva = await models.Reserva.findOne({
            where: {
                IdCancha,
                fecha,
                horario_inicio,
            },
        });

        if (existingReserva) {
            return res.status(400).json({ message: 'Esta cancha ya está reservada en ese horario.' });
        }

        const nuevaReserva = await models.Reserva.create({
            IdCancha,
            fecha,
            horario_inicio, 
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
