import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <div>
            <span className="logo-text">SEGUP/PA</span>
            <span className="logo-sub">Secretaria de Segurança Pública</span>
          </div>
        </NavLink>
        <nav>
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/inscricoes">Inscrições</NavLink>
          <NavLink to="/nova-inscricao">Nova Inscrição</NavLink>
        </nav>
      </div>
    </header>
  );
}
