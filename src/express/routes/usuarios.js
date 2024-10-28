const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    try {
        const usuarios = await models.Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
}

async function getById(req, res) {
    const id = getIdParam(req);
    try {
        const usuarios = await models.Usuario.findByPk(id);
        if (usuarios) {
            res.status(200).json(usuarios);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
}

async function create(req, res) {
    console.log(req.body); 
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`);
    } else {
        try {
            const nuevoUsuario = await models.Usuario.create(req.body);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
        }
    }
}

async function update(req, res) {
    const id = getIdParam(req);
    try {
        if (req.body.id === id) {
            await models.Usuario.update(req.body, {
                where: {
                    id: id
                }
            });
            res.status(200).end();
        } else {
            res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
}

async function remove(req, res) {
    const id = getIdParam(req);
    try {
        const deletedCount = await models.Usuario.destroy({
            where: {
                id: id
            }
        });
        if (deletedCount) {
            res.status(200).end();
        } else {
            res.status(404).send('404 - User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
}

async function iniciosesion(req, res) {
    const { email, contrasena } = req.body; 
    console.log('Datos recibidos:', { email, contrasena }); 

    try {
        const usuario = await models.Usuario.findOne({
            where: { email: email }
        });

        console.log('Usuario encontrado:', usuario);

        if (!usuario) {
            console.error('Usuario no encontrado'); 
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (contrasena !== usuario.contrasena) {
            console.error('Contraseña incorrecta'); 
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        console.log('Inicio de sesión exitoso para el usuario:', usuario.email); 

        res.status(200).json({
            id: usuario.id,
            email: usuario.email,
        });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error); 
        res.status(500).json({ error: 'Ocurrió un error durante el ingreso' });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    iniciosesion,
};
