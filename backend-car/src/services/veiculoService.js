const prisma = require('../prismaClient');

const criarVeiculo = async (dados) => {
  const { marca, modelo, placa, ano, valorDiaria } = dados;

  if (!marca || !modelo || !placa || !ano || valorDiaria === undefined) {
    throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
  }

  if (Number(valorDiaria) <= 0) {
    throw new Error("O valor da diária deve ser maior que zero.");
  }

  const placaExistente = await prisma.veiculo.findUnique({
    where: { placa }
  });

  if (placaExistente) {
    throw new Error("Já existe um veículo cadastrado com esta placa.");
  }

  return await prisma.veiculo.create({
    data: {
      marca,
      modelo,
      placa,
      ano: Number(ano),
      valorDiaria: Number(valorDiaria)
    }
  });
};

const listarVeiculos = async (apenasDisponiveis = false) => {
  if (apenasDisponiveis) {
    return await prisma.veiculo.findMany({
      where: { disponibilidade: true }
    });
  }
  return await prisma.veiculo.findMany();
};

module.exports = {
  criarVeiculo,
  listarVeiculos
};