import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InscricaoForm from '../components/InscricaoForm';
import { InscricaoService } from '../services/api';

export default function EditarInscricao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inscricao, setInscricao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    InscricaoService.buscarPorId(id)
      .then(res => setInscricao(res.data))
      .catch(() => setError('Inscrição não encontrada.'))
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleSubmit = async (dados) => {
    setLoading(true);
    setError('');
    try {
      await InscricaoService.atualizar(id, dados);
      navigate('/inscricoes');
    } catch (err) {
      setError(err.response?.data?.mensagem || 'Erro ao atualizar inscrição.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading">Carregando...</div>;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Editar Inscrição</h1>
          <p>Protocolo: {inscricao?.protocolo}</p>
        </div>
      </div>
      <div className="container">
        <div className="card" style={{ maxWidth: 800 }}>
          {error && <div className="alert alert-error">{error}</div>}
          {inscricao && (
            <InscricaoForm
              onSubmit={handleSubmit}
              loading={loading}
              initialData={inscricao}
            />
          )}
        </div>
      </div>
    </>
  );
}
