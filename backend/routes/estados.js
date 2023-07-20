const express = require('express');
const db = require('../db'); // Importe a conexão com o banco de dados

const router = express.Router();

// Rota para buscar os dados dos estados
router.get('/', (req, res) => {
  db.query('SELECT * FROM estados', (error, results) => {
    if (error) {
      console.error('Erro ao buscar dados dos estados:', error);
      return res.status(500).send('Erro ao buscar dados dos estados.');
    }
    res.send(results.rows);
  });
});

module.exports = router;
