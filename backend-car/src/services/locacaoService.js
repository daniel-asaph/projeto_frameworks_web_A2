const prisma = require('../prismaClient');

const criarLocacao = async (usuarioId, dados) => {
  const { veiculoId, dataInicio, dataDevolucaoPrevista } = dados;

  if (!veiculoId || !dataInicio || !dataDevolucaoPrevista) {
    throw new Error("Veículo, data de início e data prevista de devolução são obrigatórios.");
  }

  const inicio = new Date(dataInicio);
  const fimPrevisto = new Date(dataDevolucaoPrevista);

  if (isNaN(inicio.getTime()) || isNaN(fimPrevisto.getTime())) {
    throw new Error("Datas informadas são inválidas.");
  }

  if (fimPrevisto <= inicio) {
    throw new Error("A data prevista de devolução deve ser posterior à data de início.");
  }

  const veiculo = await prisma.veiculo.findUnique({
    where: { id: Number(veiculoId) }
  });

  if (!veiculo) {
    const erro = new Error("Veículo não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  if (!veiculo.disponibilidade) {
    const erro = new Error("Este veículo não está disponível para locação.");
    erro.statusCode = 409;
    throw erro;
  }

  const diferencaMs = fimPrevisto.getTime() - inicio.getTime();
  const diferencaHoras = diferencaMs / (1000 * 60 * 60);
  const diarias = Math.ceil(diferencaHoras / 24);
  const valorTotal = diarias * veiculo.valorDiaria;

  return await prisma.$transaction(async (tx) => {
    const atualizado = await tx.veiculo.updateMany({
      where: {
        id: Number(veiculoId),
        disponibilidade: true
      },
      data: {
        disponibilidade: false
      }
    });

    if (atualizado.count === 0) {
      const erro = new Error("Conflito: o veículo acabou de ser alugado por outro usuário.");
      erro.statusCode = 409;
      throw erro;
    }

    return await tx.locacao.create({
      data: {
        usuarioId: Number(usuarioId),
        veiculoId: Number(veiculoId),
        dataInicio: inicio,
        dataDevolucaoPrevista: fimPrevisto,
        valorTotal,
        status: "ATIVA"
      },
      include: {
        veiculo: true
      }
    });
  });
};

const listarLocacoesUsuario = async (usuarioId) => {
  return await prisma.locacao.findMany({
    where: {
      usuarioId: Number(usuarioId)
    },
    include: {
      veiculo: true
    },
    orderBy: {
      id: 'desc'
    }
  });
};

const finalizarLocacao = async (locacaoId, usuarioId) => {
  const locacao = await prisma.locacao.findUnique({
    where: { id: Number(locacaoId) }
  });

  if (!locacao) {
    const erro = new Error("Locação não encontrada.");
    erro.statusCode = 404;
    throw erro;
  }

  if (locacao.usuarioId !== Number(usuarioId)) {
    const erro = new Error("Acesso negado: você não pode finalizar a locação de outro usuário.");
    erro.statusCode = 403;
    throw erro;
  }

  if (locacao.status === "FINALIZADA" || locacao.dataDevolucaoEfetiva !== null) {
    const erro = new Error("Esta locação já foi finalizada anteriormente.");
    erro.statusCode = 400;
    throw erro;
  }

  return await prisma.$transaction(async (tx) => {
    const locacaoFinalizada = await tx.locacao.update({
      where: { id: Number(locacaoId) },
      data: {
        dataDevolucaoEfetiva: new Date(),
        status: "FINALIZADA"
      },
      include: {
        veiculo: true
      }
    });

    await tx.veiculo.update({
      where: { id: locacao.veiculoId },
      data: {
        disponibilidade: true
      }
    });

    return locacaoFinalizada;
  });
};

module.exports = {
  criarLocacao,
  listarLocacoesUsuario,
  finalizarLocacao
};