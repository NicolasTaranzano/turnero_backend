const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    try {
        const deportes = await models.Deporte.findAll();
        res.status(200).json(deportes);
    } catch (error) {
        console.error('Error fetching sports:', error);
        res.status(500).send('Error fetching sports');
    }
}

async function getById(req, res) {
    const id = getIdParam(req);
    try {
        const deportes = await models.Deporte.findByPk(id);
        if (deportes) {
            res.status(200).json(deportes);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error('Error fetching sport:', error);
        res.status(500).send('Error fetching sport');
    }
}

async function create(req, res) {
    try {
        const nuevoDeporte = await models.Deporte.create(req.body);
        res.status(201).json(nuevoDeporte);
    } catch (error) {
        console.error('Error creating sport:', error);
        res.status(500).send('Error creating sport');
    }
}

async function update(req, res) {
    const id = getIdParam(req);
    try {
        if (req.body.id === id) {
            await models.Deporte.update(req.body, {
                where: { id: id },
            });
            res.status(200).end();
        } else {
            res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
        }
    } catch (error) {
        console.error('Error updating sport:', error);
        res.status(500).send('Error updating sport');
    }
}
async function remove(req, res) {
    const id = getIdParam(req);
    try {
        const deletedCount = await models.Deporte.destroy({
            where: { id: id },
        });
        if (deletedCount) {
            res.status(200).end();
        } else {
            res.status(404).send('404 - Sport not found');
        }
    } catch (error) {
        console.error('Error deleting sport:', error);
        res.status(500).send('Error deleting sport');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
