// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/db'); 
const Deporte = require('./models/Deporte'); 
const Usuario = require('./models/Usuario');
const Cancha = require('./models/Cancha');
const Horario = require('./models/Horario');
const Reserva = require('./models/Reserva');
const CanchaHorario = require('./models/CanchaHorario');
const cors = require('cors'); 
const relacion = require('./relaciones');


const app = express(); // Crea la instancia de express
const PORT = process.env.PORT || 4000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json()); // Para parsear JSON
app.use(express.json()); // Si utilizas JSON en tus peticiones

// Datos iniciales para deportes
const deportesIniciales = [
  { nombre: 'Fútbol5' },
  { nombre: 'Fútbol7' },
  { nombre: 'Fútbol11' },
  { nombre: 'Padel' },
  { nombre: 'Tenis' },
  { nombre: 'Basquet 3v3' },
  { nombre: 'Basquet 5v5' },
  { nombre: 'Voley' },
  { nombre: 'BeachVoley' }
];


// Función asíncrona para sincronizar la base de datos y cargar datos
async function startServer() {
  try {
    // Sincronizar modelos con la base de datos antes de iniciar el servidor
    await sequelize.sync({ force: true }); // Cambia `force: true` solo si quieres sobrescribir la tabla
    console.log('Tablas sincronizadas correctamente');

    // Precarga los deportes en la base de datos
    await Deporte.bulkCreate(deportesIniciales);
    console.log('Deportes iniciales cargados correctamente');
   


    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor o al cargar datos iniciales:', error);
  }
}

// Llamar a la función para iniciar el servidor
startServer();
