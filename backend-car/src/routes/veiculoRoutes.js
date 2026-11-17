const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');
const autenticarToken = require('../middlewares/authMiddleware');

router.post('/veiculos', autenticarToken, veiculoController.criarVeiculo);
router.get('/veiculos', autenticarToken, veiculoController.listarVeiculos);
router.get('/veiculos/disponiveis', autenticarToken, veiculoController.listarDisponiveis);

module.exports = router;