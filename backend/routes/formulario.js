const express = require('express');
const db = require('../db'); // Importe a conexão com o banco de dados

const router = express.Router();

// Rota para salvar os dados do formulário
router.post('/', (req, res) => {
  const { estado, uf } = req.body;
  console.log(`Dados do formulário: estado=${estado}, uf=${uf}`);

  db.query('INSERT INTO estados (nome, uf) VALUES ($1, $2)', [estado, uf], (error, results) => {
    if (error) {
      console.error('Erro ao inserir os dados:', error);
      return res.status(500).send('Erro ao salvar os dados do formulário.');
    }
    console.log(`Inserido com sucesso: ${results.rowCount} linha(s)`);
    res.send('Formulário enviado com sucesso!');
  });
});

module.exports = router;
