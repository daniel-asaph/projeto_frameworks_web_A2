export interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
}

export interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  valorDiaria: number;
  disponibilidade: boolean;
}

export type StatusLocacao = 'ATIVA' | 'FINALIZADA';

export interface Locacao {
  id: number;
  dataInicio: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoEfetiva: string | null;
  valorTotal: number | null;
  status: StatusLocacao;
  usuarioId: number;
  veiculoId: number;
  veiculo?: Veiculo;
}


export interface LoginPayload {
  email: string;
  senha: string;
}

export interface CadastroUsuarioPayload {
  nome: string;
  email: string;
  senha: string;
}

export type CriarVeiculoPayload = Omit<Veiculo, 'id' | 'disponibilidade'>;

export interface CriarLocacaoPayload {
  veiculoId: number;
  dataInicio: string;
  dataDevolucaoPrevista: string;
}

