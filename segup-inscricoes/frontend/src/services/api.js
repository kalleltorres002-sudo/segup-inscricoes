import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export const InscricaoService = {
  criar: (dados) => api.post('/inscricoes', dados),
  listar: () => api.get('/inscricoes'),
  buscarPorId: (id) => api.get(`/inscricoes/${id}`),
  buscarPorProtocolo: (protocolo) => api.get(`/inscricoes/protocolo/${protocolo}`),
  atualizar: (id, dados) => api.put(`/inscricoes/${id}`, dados),
  cancelar: (id) => api.patch(`/inscricoes/${id}/cancelar`),
};

export default api;
