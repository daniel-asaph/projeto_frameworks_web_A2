const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');
const autenticarToken = require('../middlewares/authMiddleware');

router.post('/locacoes', autenticarToken, locacaoController.criarLocacao);
router.get('/locacoes', autenticarToken, locacaoController.listarMinhasLocacoes);
router.patch('/locacoes/:id/finalizar', autenticarToken, locacaoController.finalizarLocacao);

module.exports = router;