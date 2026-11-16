const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');

router.post('/locacoes', locacaoController.criarLocacao);
router.get('/locacoes', locacaoController.listarMinhasLocacoes);
router.patch('/locacoes/:id/finalizar', locacaoController.finalizarLocacao);

module.exports = router;