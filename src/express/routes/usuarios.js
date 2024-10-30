const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

async function login (req, res) {
    const{ email, contrasena } = req.body;
    
    try{
        const usuario = await models.Usuario.findOne({
            where: { email: email }
        });

        if (!usuario || !await bcrypt.compare(contrasena, usuario.contrasena)) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(400).json({ error: 'Error en el inicio de sesión', detalles: error.message });
    }

}

async function register (req, res) {
    const { nombre, apellido, email, contrasena } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        const usuario = await models.Usuario.create({ nombre, apellido, email, contrasena: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado con éxito', usuario });

    } catch (error) {
        res.status(400).json({ error: 'Error en el registro', detalles: error.message });
    }

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    login,
    register,
};
