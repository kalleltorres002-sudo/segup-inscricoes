import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InscricaoService } from '../services/api';

export default function Confirmacao() {
  const { protocolo } = useParams();
  const [inscricao, setInscricao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    InscricaoService.buscarPorProtocolo(protocolo)
      .then(res => setInscricao(res.data))
      .catch(() => setError('Inscrição não encontrada.'))
      .finally(() => setLoading(false));
  }, [protocolo]);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return (
    <div className="container">
      <div className="alert alert-error" style={{ marginTop: '2rem' }}>{error}</div>
    </div>
  );

  const isConfirmada = inscricao.status === 'CONFIRMADA';

  return (
    <div className="container">
      <div className="card confirmacao-card">
        <div className="confirmacao-icon">{isConfirmada ? '✅' : '❌'}</div>

        <h2 style={{ color: isConfirmada ? 'var(--sucesso)' : 'var(--cancelado)', marginBottom: '0.5rem' }}>
          {isConfirmada ? 'Inscrição Confirmada!' : 'Inscrição Cancelada'}
        </h2>

        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          Olá, <strong>{inscricao.nomeCompleto}</strong>
        </p>
        <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {isConfirmada
            ? 'Sua inscrição foi registrada com sucesso no sistema SEGUP/PA.'
            : 'Esta inscrição foi cancelada.'}
        </p>

        <div className="protocolo-box">{inscricao.protocolo}</div>

        <table style={{ width: '100%', textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem' }}>
          <tbody>
            {[
              ['Nome', inscricao.nomeCompleto],
              ['CPF', inscricao.cpf],
              ['E-mail', inscricao.email],
              ['Telefone', inscricao.telefone],
              ['Serviço/Evento', inscricao.servicoCursoEvento],
              ['Status', inscricao.status],
            ].map(([label, value]) => (
              <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.6rem 0.5rem', color: '#888', fontWeight: 600, width: '40%' }}>{label}</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>
                  {label === 'Status'
                    ? <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>
                    : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/inscricoes" className="btn btn-secondary">← Ver todas as inscrições</Link>
          <Link to="/nova-inscricao" className="btn btn-primary">+ Nova Inscrição</Link>
        </div>
      </div>
    </div>
  );
}
