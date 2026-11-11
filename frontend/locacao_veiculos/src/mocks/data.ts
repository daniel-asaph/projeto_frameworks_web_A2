import type { Locacao, Veiculo } from '../types';

export const MOCK_USUARIO_ID = 1;

export const MOCK_VEICULOS: Veiculo[] = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla XEi', placa: 'QWE1A23', ano: 2022, valorDiaria: 180, disponibilidade: false },
  { id: 2, marca: 'Honda', modelo: 'Civic Touring', placa: 'BRA2E19', ano: 2023, valorDiaria: 210, disponibilidade: false },
  { id: 3, marca: 'Fiat', modelo: 'Argo Drive', placa: 'KJH4B56', ano: 2021, valorDiaria: 120, disponibilidade: true },
  { id: 4, marca: 'Chevrolet', modelo: 'Onix Premier', placa: 'MNO7C88', ano: 2022, valorDiaria: 135, disponibilidade: true },
  { id: 5, marca: 'Volkswagen', modelo: 'T-Cross Highline', placa: 'PLK3D41', ano: 2023, valorDiaria: 230, disponibilidade: true },
  { id: 6, marca: 'Hyundai', modelo: 'HB20 Platinum', placa: 'RTY9F12', ano: 2024, valorDiaria: 140, disponibilidade: true },
  { id: 7, marca: 'Jeep', modelo: 'Compass Longitude', placa: 'JPC5G77', ano: 2023, valorDiaria: 290, disponibilidade: true },
  { id: 8, marca: 'Renault', modelo: 'Kwid Zen', placa: 'RNK1H05', ano: 2021, valorDiaria: 95, disponibilidade: true },
  { id: 9, marca: 'Nissan', modelo: 'Kicks Exclusive', placa: 'NSK8J33', ano: 2022, valorDiaria: 200, disponibilidade: true },
];

const veiculoPorId = (id: number) => MOCK_VEICULOS.find((v) => v.id === id);

export const MOCK_LOCACOES: Locacao[] = [
  {
    id: 1,
    dataInicio: '2026-10-15T00:00:00.000Z',
    dataDevolucaoPrevista: '2026-10-22T00:00:00.000Z',
    dataDevolucaoEfetiva: null,
    valorTotal: null,
    status: 'ATIVA',
    usuarioId: MOCK_USUARIO_ID,
    veiculoId: 1,
    veiculo: veiculoPorId(1),
  },
  {
    id: 2,
    dataInicio: '2026-10-18T00:00:00.000Z',
    dataDevolucaoPrevista: '2026-10-25T00:00:00.000Z',
    dataDevolucaoEfetiva: null,
    valorTotal: null,
    status: 'ATIVA',
    usuarioId: MOCK_USUARIO_ID,
    veiculoId: 2,
    veiculo: veiculoPorId(2),
  },
  {
    id: 3,
    dataInicio: '2026-10-01T00:00:00.000Z',
    dataDevolucaoPrevista: '2026-10-05T00:00:00.000Z',
    dataDevolucaoEfetiva: '2026-10-05T00:00:00.000Z',
    valorTotal: 480,
    status: 'FINALIZADA',
    usuarioId: MOCK_USUARIO_ID,
    veiculoId: 3,
    veiculo: veiculoPorId(3),
  },
  {
    id: 4,
    dataInicio: '2026-09-20T00:00:00.000Z',
    dataDevolucaoPrevista: '2026-09-23T00:00:00.000Z',
    dataDevolucaoEfetiva: '2026-09-24T00:00:00.000Z',
    valorTotal: 540,
    status: 'FINALIZADA',
    usuarioId: MOCK_USUARIO_ID,
    veiculoId: 4,
    veiculo: veiculoPorId(4),
  },
];
