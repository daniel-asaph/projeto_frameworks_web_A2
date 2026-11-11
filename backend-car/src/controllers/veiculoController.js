const veiculoService = require('../services/veiculoService');

const criarVeiculo = async (req, res) => {
  try {
    // Passa os dados recebidos na requisição para o serviço
    const veiculo = await veiculoService.criarVeiculo(req.body);
    return res.status(201).json(veiculo); // 201: Criado com sucesso
  } catch (error) {
    // Se o serviço der erro (ex: diária negativa ou placa repetida), devolve erro 400
    return res.status(400).json({ erro: error.message });
  }
};

const listarVeiculos = async (req, res) => {
  try {
    const veiculos = await veiculoService.listarVeiculos();
    return res.status(200).json(veiculos); // 200: OK
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar os veículos." });
  }
};

module.exports = {
  criarVeiculo,
  listarVeiculos
};