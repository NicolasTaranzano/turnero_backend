const { models } = require('../../sequelize');

async function buscar(req, res) {
    console.log(req.body);
    const { IdDeporte, Fecha, Horario } = req.body;

    try {
        // Busca las canchas por deporte
        const canchas = await models.Cancha.findAll({
            where: {
                IdDeporte: IdDeporte,
            },
        });

        console.log('Canchas encontradas:', canchas.map(c => c.id)); // Muestra las canchas encontradas

        // Verifica si se encontraron canchas
        if (canchas.length === 0) {
            console.log('No se encontraron canchas para el deporte especificado.');
            return res.status(404).json({ message: 'No se encontraron canchas para el deporte especificado.' });
        }

        const canchasDisponibles = []; // Array para almacenar canchas disponibles

        for (const cancha of canchas) {
            const turnoCancha = await models.Reserva.findOne({
                where: {
                    IdCancha: cancha.id,
                    fecha: Fecha,
                    horario_inicio: Horario,
                },
            });

            // Si no se encuentra un turno, la cancha está disponible
            if (!turnoCancha) {
                console.log(`La cancha ID ${cancha.id} está disponible en la fecha ${Fecha} y horario ${Horario}.`);
                canchasDisponibles.push(cancha); // Agrega la cancha al array de canchas disponibles
            } else {
                console.log(`La cancha ID ${cancha.id} no está disponible.`);
            }
        }

        // Si hay canchas disponibles, puedes guardarlas en la base de datos o devolverlas
        if (canchasDisponibles.length > 0) {
            console.log('Canchas disponibles encontradas:', canchasDisponibles);

            // Aquí podrías guardar las canchas disponibles en otra tabla si es necesario
            // Por ejemplo, si tienes una tabla para reservas futuras o un registro de disponibilidad
            // await models.Disponibilidad.bulkCreate(canchasDisponibles.map(c => ({
            //     IdCancha: c.id,
            //     fecha: Fecha,
            //     horario_inicio: Horario,
            // })));

            return res.status(200).json({ canchasDisponibles }); // Devuelve las canchas disponibles
        } else {
            console.log('No hay canchas libres en el día y horario especificado.');
            return res.status(403).json({ message: 'No hay canchas libres en el día y horario especificado.' });
        }
    } catch (error) {
        console.error('Error al buscar canchas:', error);
        return res.status(500).send('Error interno del servidor al buscar canchas');
    }
}

module.exports = {
    buscar,
};
