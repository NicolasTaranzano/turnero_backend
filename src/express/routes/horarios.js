const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    try {
        const horarios = await models.Horario.findAll();
        res.status(200).json(horarios);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).send('Error fetching schedules');
    }
}

async function getById(req, res) {
    const id = getIdParam(req);
    try {
        const horario = await models.Horario.findByPk(id);
        if (horario) {
            res.status(200).json(horario);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).send('Error fetching schedule');
    }
}

async function create(req, res) {
    try {
        const nuevoHorario = await models.Horario.create(req.body);
        res.status(201).json(nuevoHorario);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).send('Error creating schedule');
    }
}

async function update(req, res) {
    const id = getIdParam(req);
    try {
        await models.Horario.update(req.body, {
            where: { id: id },
        });
        res.status(200).end();
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).send('Error updating schedule');
    }
}

async function remove(req, res) {
    const id = getIdParam(req);
    try {
        const deletedCount = await models.Horario.destroy({
            where: { id: id },
        });
        if (deletedCount) {
            res.status(200).end();
        } else {
            res.status(404).send('404 - Schedule not found');
        }
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).send('Error deleting schedule');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
