const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

router.post('/veiculos', veiculoController.criarVeiculo);
router.get('/veiculos', veiculoController.listarVeiculos);
router.get('/veiculos/disponiveis', veiculoController.listarDisponiveis);

module.exports = router;