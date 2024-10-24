// routes/api.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Obtener todas las canchas
router.get('/canchas', (req, res) => {
  db.query('SELECT * FROM cancha', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Crear una nueva reserva
router.post('/reservas', (req, res) => {
  const { id_cliente, id_cancha, fecha, hora_inicio, hora_fin } = req.body;
  const query = 'INSERT INTO reserva (id_cliente, id_cancha, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, "confirmada")';

  db.query(query, [id_cliente, id_cancha, fecha, hora_inicio, hora_fin], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Reserva creada', id: result.insertId });
  });
});

module.exports = router;
