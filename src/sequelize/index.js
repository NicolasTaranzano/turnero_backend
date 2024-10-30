const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
require('dotenv').config(); 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logQueryParameters: true,
    benchmark: true,
});

const modelDefiners = [
	require('./models/Cancha.model'),
    require('./models/Deporte.model'),
    require('./models/Reserva.model'),
    require('./models/Usuario.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;