const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    try {
        const reservas = await models.Reserva.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).send('Error fetching reservations');
    }
}

async function getById(req, res) {
    const id = getIdParam(req);
    try {
        const reserva = await models.Reserva.findByPk(id);
        if (reserva) {
            res.status(200).json(reserva);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error('Error fetching reservation:', error);
        res.status(500).send('Error fetching reservation');
    }
}

async function create(req, res) {
    try {
        const nuevaReserva = await models.Reserva.create(req.body);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).send('Error creating reservation');
    }
}

async function update(req, res) {
    const id = getIdParam(req);
    try {
        if (req.body.id === id) {
            await models.Reserva.update(req.body, {
                where: { id: id },
            });
            res.status(200).end();
        } else {
            res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).send('Error updating reservation');
    }
}

async function remove(req, res) {
    const id = getIdParam(req);
    try {
        const deletedCount = await models.Reserva.destroy({
            where: { id: id },
        });
        if (deletedCount) {
            res.status(200).end();
        } else {
            res.status(404).send('404 - Reservation not found');
        }
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).send('Error deleting reservation');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
