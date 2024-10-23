// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Rutas de API
app.use('/api', apiRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
