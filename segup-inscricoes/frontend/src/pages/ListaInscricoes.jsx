import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InscricaoService } from '../services/api';

export default function ListaInscricoes() {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const carregar = async () => {
    try {
      const res = await InscricaoService.listar();
      setInscricoes(res.data);
    } catch {
      setMsg('Erro ao carregar inscrições.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const handleCancelar = async (id) => {
    if (!window.confirm('Confirmar cancelamento desta inscrição?')) return;
    try {
      await InscricaoService.cancelar(id);
      setMsg('Inscrição cancelada com sucesso.');
      carregar();
    } catch (err) {
      setMsg(err.response?.data?.mensagem || 'Erro ao cancelar.');
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Inscrições</h1>
          <p>Gerencie todas as inscrições cadastradas no sistema</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
            <h2 style={{ fontSize:'1.1rem', color:'var(--azul)' }}>
              Total: {inscricoes.length} inscrição(ões)
            </h2>
            <Link to="/nova-inscricao" className="btn btn-primary btn-sm">+ Nova Inscrição</Link>
          </div>

          {msg && <div className="alert alert-info">{msg}</div>}

          {loading ? (
            <div className="loading">Carregando...</div>
          ) : inscricoes.length === 0 ? (
            <div className="empty">Nenhuma inscrição encontrada.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Protocolo</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Serviço/Evento</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inscricoes.map(ins => (
                    <tr key={ins.id}>
                      <td><strong>{ins.protocolo}</strong></td>
                      <td>{ins.nomeCompleto}</td>
                      <td>{ins.email}</td>
                      <td>{ins.servicoCursoEvento}</td>
                      <td>
                        <span className={`badge badge-${ins.status.toLowerCase()}`}>
                          {ins.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate(`/inscricoes/${ins.id}/editar`)}
                            disabled={ins.status === 'CANCELADA'}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancelar(ins.id)}
                            disabled={ins.status === 'CANCELADA'}
                          >
                            Cancelar
                          </button>
                          <Link
                            to={`/confirmacao/${ins.protocolo}`}
                            className="btn btn-secondary btn-sm"
                          >
                            Ver
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
