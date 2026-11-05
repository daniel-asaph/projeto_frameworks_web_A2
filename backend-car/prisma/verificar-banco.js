require('dotenv').config({ quiet: true });
const prisma = require('../src/prismaClient');

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  console.log('ConexÃ£o com o MySQL: OK');

  const placaTeste = `TST${Date.now().toString().slice(-4)}`;

  await prisma.$transaction(async (tx) => {
    const veiculo = await tx.veiculo.create({
      data: { marca: 'Teste', modelo: 'Verificacao', placa: placaTeste, ano: 2024, valorDiaria: '10.00' },
    });
    const lido = await tx.veiculo.findUnique({ where: { id: veiculo.id } });
    if (!lido) throw new Error('Falha ao ler o veÃ­culo recÃ©m-criado');
    console.log(`Escrita e leitura: OK (veÃ­culo ${lido.placa} criado e lido dentro de uma transaÃ§Ã£o)`);
    throw new Error('ROLLBACK_INTENCIONAL');
  }).catch((erro) => {
    if (erro.message !== 'ROLLBACK_INTENCIONAL') throw erro;
  });

  const residuo = await prisma.veiculo.findUnique({ where: { placa: placaTeste } });
  console.log(`Rollback da transaÃ§Ã£o: ${residuo ? 'FALHOU' : 'OK'}`);

  const locacoes = await prisma.locacao.findMany({
    take: 3,
    orderBy: { dataInicio: 'desc' },
    include: {
      veiculo: { select: { marca: true, modelo: true, placa: true } },
      usuario: { select: { nome: true, email: true } },
    },
  });
  console.log(`Consulta com include/select (relaÃ§Ãµes 1:N): ${locacoes.length} locaÃ§Ã£o(Ãµes) retornada(s)`);
  for (const l of locacoes) {
    console.log(`  #${l.id} ${l.status} | ${l.usuario.nome} | ${l.veiculo.marca} ${l.veiculo.modelo} (${l.veiculo.placa}) | R$ ${l.valorTotal}`);
  }

  const usuarioComLocacoes = await prisma.usuario.findFirst({
    where: { locacoes: { some: {} } },
    select: { nome: true, _count: { select: { locacoes: true } } },
  });
  if (usuarioComLocacoes) {
    console.log(`RelaÃ§Ã£o Usuario -> Locacao: ${usuarioComLocacoes.nome} possui ${usuarioComLocacoes._count.locacoes} locaÃ§Ã£o(Ãµes)`);
  }
}

main()
  .catch((erro) => {
    console.error('VerificaÃ§Ã£o falhou:', erro.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
