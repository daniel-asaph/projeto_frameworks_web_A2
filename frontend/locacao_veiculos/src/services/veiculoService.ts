import { api } from '../api/api';
import type { CriarVeiculoPayload, Veiculo } from '../types';

export const veiculoService = {
  async listar(apenasDisponiveis?: boolean): Promise<Veiculo[]> {
    const { data } = await api.get<Veiculo[]>('/veiculos', {
      params: apenasDisponiveis ? { disponivel: 'true' } : undefined,
    });
    return data;
  },

  async criar(payload: CriarVeiculoPayload): Promise<Veiculo> {
    const { data } = await api.post<Veiculo>('/veiculos', payload);
    return data;
  },
};