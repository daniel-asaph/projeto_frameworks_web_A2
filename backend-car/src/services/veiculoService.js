const prisma = require('../prismaClient');

const criarVeiculo = async (dados) => {
  
  if (dados.valorDiaria <= 0) {
    throw new Error("O valor da diária deve ser maior que zero.");
  }

  
  const veiculo = await prisma.veiculo.create({
    data: dados
  });

  return veiculo;
};

const listarVeiculos = async () => {
 
  return await prisma.veiculo.findMany();
};

module.exports = {
  criarVeiculo,
  listarVeiculos
};