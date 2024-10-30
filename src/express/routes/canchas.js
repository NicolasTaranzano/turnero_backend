const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    try {
        const canchas = await models.Cancha.findAll();
        res.status(200).json(canchas);
    } catch (error) {
        console.error('Error fetching fields:', error);
        res.status(500).send('Error fetching fields');
    }
}

async function getById(req, res) {
    const id = getIdParam(req);
    try {
        const cancha = await models.Cancha.findByPk(id);
        if (cancha) {
            res.status(200).json(cancha);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error('Error fetching field:', error);
        res.status(500).send('Error fetching field');
    }
}

async function create(req, res) {
    try {
        const nuevaCancha = await models.Cancha.create(req.body);
        res.status(201).json(nuevaCancha);
    } catch (error) {
        console.error('Error creating field:', error);
        res.status(500).send('Error creating field');
    }
}

async function update(req, res) {
    const id = getIdParam(req);
    try {
        if (req.body.id === id) {
            await models.Cancha.update(req.body, {
                where: { id: id },
            });
            res.status(200).end();
        } else {
            res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
        }
    } catch (error) {
        console.error('Error updating field:', error);
        res.status(500).send('Error updating field');
    }
}

async function remove(req, res) {
    const id = getIdParam(req);
    try {
        const deletedCount = await models.Cancha.destroy({
            where: { id: id },
        });
        if (deletedCount) {
            res.status(200).end();
        } else {
            res.status(404).send('404 - Field not found');
        }
    } catch (error) {
        console.error('Error deleting field:', error);
        res.status(500).send('Error deleting field');
    }
}




module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
