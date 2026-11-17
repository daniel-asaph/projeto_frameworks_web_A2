const locacaoService = require('../services/locacaoService');

const criarLocacao = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    if (!usuarioId) {
      return res.status(401).json({ erro: "Usuário não autenticado." });
    }

    const locacao = await locacaoService.criarLocacao(usuarioId, req.body);
    return res.status(201).json(locacao);
  } catch (error) {
    const status = error.statusCode || 400;
    return res.status(status).json({ erro: error.message });
  }
};

const listarMinhasLocacoes = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    if (!usuarioId) {
      return res.status(401).json({ erro: "Usuário não autenticado." });
    }

    const locacoes = await locacaoService.listarLocacoesUsuario(usuarioId);
    return res.status(200).json(locacoes);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar o histórico de locações." });
  }
};

const finalizarLocacao = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    if (!usuarioId) {
      return res.status(401).json({ erro: "Usuário não autenticado." });
    }

    const locacao = await locacaoService.finalizarLocacao(id, usuarioId);
    return res.status(200).json(locacao);
  } catch (error) {
    const status = error.statusCode || 400;
    return res.status(status).json({ erro: error.message });
  }
};

module.exports = {
  criarLocacao,
  listarMinhasLocacoes,
  finalizarLocacao
};