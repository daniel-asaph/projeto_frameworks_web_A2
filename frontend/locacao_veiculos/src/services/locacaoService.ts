import { api } from '../api/api';
import type { CriarLocacaoPayload, Locacao } from '../types';

export const locacaoService = {
  async listarPorUsuario(usuarioId: number): Promise<Locacao[]> {
    const { data } = await api.get<Locacao[]>('/locacoes', {
      params: { usuarioId },
    });
    return data;
  },

  async criar(usuarioId: number, payload: CriarLocacaoPayload): Promise<Locacao> {
    const { data } = await api.post<Locacao>('/locacoes', {
      ...payload,
      usuarioId,
    });
    return data;
  },

  async finalizar(locacaoId: number, usuarioId: number): Promise<Locacao> {
    const { data } = await api.patch<Locacao>(`/locacoes/${locacaoId}/finalizar`, {
      usuarioId,
    });
    return data;
  },
};