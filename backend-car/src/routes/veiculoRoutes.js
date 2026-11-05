const express = require("express");
const router = express.Router();
const veiculoService = require("../services/veiculoService");

router.post('/veiculos', veiculoController.criarVeiculo);
router.get('/veiculos', veiculoController.listarVeiculos);

module.exports = router;
