const veiculoService = require('../services/veiculoService');

const criarVeiculo = async (req, res) => {
  try {
    const veiculo = await veiculoService.criarVeiculo(req.body);
    return res.status(201).json(veiculo);
  } catch (error) {
    const status = error.message.includes("placa") ? 409 : 400;
    return res.status(status).json({ erro: error.message });
  }
};

const listarVeiculos = async (req, res) => {
  try {
    const apenasDisponiveis = req.query.disponivel === 'true';
    const veiculos = await veiculoService.listarVeiculos(apenasDisponiveis);
    return res.status(200).json(veiculos);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar os veículos." });
  }
};

const listarDisponiveis = async (req, res) => {
  try {
    const veiculos = await veiculoService.listarVeiculos(true);
    return res.status(200).json(veiculos);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar veículos disponíveis." });
  }
};

module.exports = {
  criarVeiculo,
  listarVeiculos,
  listarDisponiveis
};