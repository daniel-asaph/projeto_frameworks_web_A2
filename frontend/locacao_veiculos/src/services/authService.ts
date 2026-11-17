import { api } from '../api/api';
import type { CadastroUsuarioPayload, LoginPayload, Usuario } from '../types';

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  },

  async cadastrar(payload: CadastroUsuarioPayload): Promise<Usuario> {
    const { data } = await api.post<Usuario>('/auth/register', payload);
    return data;
  },
};