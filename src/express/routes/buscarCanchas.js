const { models } = require('../../sequelize');

async function buscar(req, res) {
    console.log(req.body);
    const { IdDeporte, Fecha, Horario } = req.body;

    try {
        
        const canchas = await models.Cancha.findAll({
            where: {
                IdDeporte: IdDeporte,
            },
        });

        console.log('Canchas encontradas:', canchas.map(c => c.id)); 

        
        if (canchas.length === 0) {
            console.log('No se encontraron canchas para el deporte especificado.');
            return res.status(404).json({ message: 'No se encontraron canchas para el deporte especificado.' });
        }

        const canchasDisponibles = []; 

        for (const cancha of canchas) {
            const turnoCancha = await models.Reserva.findOne({
                where: {
                    IdCancha: cancha.id,
                    fecha: Fecha,
                    horario_inicio: Horario,
                },
            });

            
            if (!turnoCancha) {
                console.log(`La cancha ID ${cancha.id} está disponible en la fecha ${Fecha} y horario ${Horario}.`);
                canchasDisponibles.push(cancha); 
            } else {
                console.log(`La cancha ID ${cancha.id} no está disponible.`);
            }
        }

        
        if (canchasDisponibles.length > 0) {
            console.log('Canchas disponibles encontradas:', canchasDisponibles);
            return res.status(200).json({ canchasDisponibles }); 
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
