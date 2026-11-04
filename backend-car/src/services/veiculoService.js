const prisma = require('../prismaClient');

const criarVeiculo = async (dados) => {
  // Regra de negócio: o valor da diária tem de ser válido
  if (dados.valorDiaria <= 0) {
    throw new Error("O valor da diária deve ser maior que zero.");
  }

  // O Prisma lida com a criação no MySQL (e bloqueia matrículas repetidas por causa do @unique)
  const veiculo = await prisma.veiculo.create({
    data: dados
  });

  return veiculo;
};

const listarVeiculos = async () => {
  // Retorna todos os veículos guardados no banco de dados
  return await prisma.veiculo.findMany();
};

module.exports = {
  criarVeiculo,
  listarVeiculos
};