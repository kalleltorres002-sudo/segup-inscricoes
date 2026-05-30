import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InscricaoForm from '../components/InscricaoForm';
import { InscricaoService } from '../services/api';

export default function NovaInscricao() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (dados) => {
    setLoading(true);
    setError('');
    try {
      const response = await InscricaoService.criar(dados);
      const { protocolo } = response.data;
      navigate(`/confirmacao/${protocolo}`);
    } catch (err) {
      const msg = err.response?.data?.mensagem
        || JSON.stringify(err.response?.data?.campos)
        || 'Erro ao criar inscrição. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Nova Inscrição</h1>
          <p>Preencha todos os campos obrigatórios marcados com *</p>
        </div>
      </div>
      <div className="container">
        <div className="card" style={{ maxWidth: 800 }}>
          {error && <div className="alert alert-error">{error}</div>}
          <InscricaoForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </>
  );
}
