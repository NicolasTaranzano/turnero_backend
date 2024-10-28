const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    try {
        const canchaHorarios = await models.CanchaHorario.findAll();
        res.status(200).json(canchaHorarios);
    } catch (error) {
        console.error('Error fetching cancha horarios:', error);
        res.status(500).send('Error fetching cancha horarios');
    }
}

async function getById(req, res) {
    const id = getIdParam(req);
    try {
        const canchaHorario = await models.CanchaHorario.findByPk(id);
        if (canchaHorario) {
            res.status(200).json(canchaHorario);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error('Error fetching cancha horario:', error);
        res.status(500).send('Error fetching cancha horario');
    }
}

async function create(req, res) {
    try {
        const nuevoCanchaHorario = await models.CanchaHorario.create(req.body);
        res.status(201).json(nuevoCanchaHorario);
    } catch (error) {
        console.error('Error creating cancha horario:', error);
        res.status(500).send('Error creating cancha horario');
    }
}

async function update(req, res) {
    const id = getIdParam(req);
    try {
        await models.CanchaHorario.update(req.body, {
            where: { id: id },
        });
        res.status(200).end();
    } catch (error) {
        console.error('Error updating cancha horario:', error);
        res.status(500).send('Error updating cancha horario');
    }
}

async function remove(req, res) {
    const id = getIdParam(req);
    try {
        const deletedCount = await models.CanchaHorario.destroy({
            where: { id: id },
        });
        if (deletedCount) {
            res.status(200).end();
        } else {
            res.status(404).send('404 - CanchaHorario not found');
        }
    } catch (error) {
        console.error('Error deleting cancha horario:', error);
        res.status(500).send('Error deleting cancha horario');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
