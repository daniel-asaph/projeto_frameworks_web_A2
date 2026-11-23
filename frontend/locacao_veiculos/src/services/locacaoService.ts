import { api } from '../api/api';
import type { CriarLocacaoPayload, Locacao } from '../types';

export const locacaoService = {
  async listarPorUsuario(_usuarioId?: number): Promise<Locacao[]> {
    const { data } = await api.get<Locacao[]>('/locacoes');
    return data;
  },

  async criar(_usuarioId: number, payload: CriarLocacaoPayload): Promise<Locacao> {
    const { data } = await api.post<Locacao>('/locacoes', payload);
    return data;
  },

  async finalizar(locacaoId: number, _usuarioId?: number): Promise<Locacao> {
    const { data } = await api.patch<Locacao>(`/locacoes/${locacaoId}/finalizar`);
    return data;
  },
};