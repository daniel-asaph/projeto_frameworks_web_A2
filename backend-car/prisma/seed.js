require('dotenv').config({ quiet: true });
const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const SENHA_PADRAO = '123456';
const UM_DIA_MS = 24 * 60 * 60 * 1000;

const usuarios = [
  { nome: 'Samuel Lucas', email: 'samuel@locadora.com' },
  { nome: 'Matheus', email: 'matheus@locadora.com' },
  { nome: 'Luan', email: 'luan@locadora.com' },
  { nome: 'Daniel Asaph', email: 'daniel@locadora.com' },
];

const veiculos = [
  { marca: 'Fiat', modelo: 'Mobi Like', placa: 'ABC1D23', ano: 2023, valorDiaria: '119.90' },
  { marca: 'Chevrolet', modelo: 'Onix LT', placa: 'BRA2E19', ano: 2024, valorDiaria: '149.90' },
  { marca: 'Volkswagen', modelo: 'T-Cross Comfortline', placa: 'QWE4R56', ano: 2023, valorDiaria: '229.00' },
  { marca: 'Toyota', modelo: 'Corolla XEi', placa: 'RTY7U89', ano: 2022, valorDiaria: '279.50' },
  { marca: 'Hyundai', modelo: 'HB20 Comfort', placa: 'HBX0A12', ano: 2024, valorDiaria: '139.00' },
  { marca: 'Jeep', modelo: 'Compass Longitude', placa: 'JEP3C45', ano: 2023, valorDiaria: '329.90' },
  { marca: 'Renault', modelo: 'Kwid Zen', placa: 'KWD6F78', ano: 2022, valorDiaria: '99.90' },
  { marca: 'Honda', modelo: 'HR-V EXL', placa: 'HRV9G01', ano: 2024, valorDiaria: '299.00' },
];

function calcularValorTotal(valorDiaria, dataInicio, dataDevolucaoPrevista) {
  const diarias = Math.ceil((dataDevolucaoPrevista - dataInicio) / UM_DIA_MS);
  return new Prisma.Decimal(valorDiaria).mul(diarias);
}

function diasAPartirDeHoje(dias, hora = 10) {
  const data = new Date();
  data.setHours(hora, 0, 0, 0);
  data.setDate(data.getDate() + dias);
  return data;
}

async function main() {
  const hash = await bcrypt.hash(SENHA_PADRAO, 10);

  const usuariosCriados = {};
  for (const u of usuarios) {
    usuariosCriados[u.email] = await prisma.usuario.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, senha: hash },
    });
  }

  const veiculosCriados = {};
  for (const v of veiculos) {
    veiculosCriados[v.placa] = await prisma.veiculo.upsert({
      where: { placa: v.placa },
      update: {},
      create: v,
    });
  }

  if ((await prisma.locacao.count()) === 0) {
    const samuel = usuariosCriados['samuel@locadora.com'];
    const daniel = usuariosCriados['daniel@locadora.com'];
    const onix = veiculosCriados['BRA2E19'];
    const corolla = veiculosCriados['RTY7U89'];
    const tcross = veiculosCriados['QWE4R56'];

    const historico = [
      {
        usuario: samuel,
        veiculo: onix,
        dataInicio: diasAPartirDeHoje(-20),
        dataDevolucaoPrevista: diasAPartirDeHoje(-17),
        dataDevolucaoEfetiva: diasAPartirDeHoje(-17, 9),
      },
      {
        usuario: daniel,
        veiculo: tcross,
        dataInicio: diasAPartirDeHoje(-10),
        dataDevolucaoPrevista: diasAPartirDeHoje(-8, 15),
        dataDevolucaoEfetiva: diasAPartirDeHoje(-8, 14),
      },
    ];

    for (const l of historico) {
      await prisma.locacao.create({
        data: {
          usuarioId: l.usuario.id,
          veiculoId: l.veiculo.id,
          dataInicio: l.dataInicio,
          dataDevolucaoPrevista: l.dataDevolucaoPrevista,
          dataDevolucaoEfetiva: l.dataDevolucaoEfetiva,
          valorTotal: calcularValorTotal(l.veiculo.valorDiaria, l.dataInicio, l.dataDevolucaoPrevista),
          status: 'FINALIZADA',
        },
      });
    }

    const inicioAtiva = diasAPartirDeHoje(-1);
    const previstaAtiva = diasAPartirDeHoje(3);
    await prisma.$transaction([
      prisma.locacao.create({
        data: {
          usuarioId: samuel.id,
          veiculoId: corolla.id,
          dataInicio: inicioAtiva,
          dataDevolucaoPrevista: previstaAtiva,
          valorTotal: calcularValorTotal(corolla.valorDiaria, inicioAtiva, previstaAtiva),
          status: 'ATIVA',
        },
      }),
      prisma.veiculo.update({
        where: { id: corolla.id },
        data: { disponibilidade: false },
      }),
    ]);
  }

  const [totalUsuarios, totalVeiculos, totalLocacoes] = await Promise.all([
    prisma.usuario.count(),
    prisma.veiculo.count(),
    prisma.locacao.count(),
  ]);
  console.log(`Seed concluÃ­do: ${totalUsuarios} usuÃ¡rios, ${totalVeiculos} veÃ­culos, ${totalLocacoes} locaÃ§Ãµes.`);
  console.log(`Senha de todos os usuÃ¡rios de exemplo: ${SENHA_PADRAO}`);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
