import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Sistema de Inscrições SEGUP/PA</h1>
          <p>Secretaria de Segurança Pública e Defesa Social do Estado do Pará</p>
        </div>
      </div>
      <div className="container">
        <div className="card" style={{ maxWidth: 700 }}>
          <h2 style={{ color: 'var(--azul)', marginBottom: '1rem' }}>Bem-vindo</h2>
          <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Este sistema permite realizar inscrições em cursos, eventos e serviços da 
            Secretaria de Segurança Pública e Defesa Social do Pará. Utilize o menu 
            acima para navegar entre as funcionalidades.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/nova-inscricao" className="btn btn-primary">
              ➕ Nova Inscrição
            </Link>
            <Link to="/inscricoes" className="btn btn-secondary">
              📋 Ver Todas as Inscrições
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
