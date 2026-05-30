import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NovaInscricao from './pages/NovaInscricao';
import ListaInscricoes from './pages/ListaInscricoes';
import EditarInscricao from './pages/EditarInscricao';
import Confirmacao from './pages/Confirmacao';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ paddingBottom: '3rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nova-inscricao" element={<NovaInscricao />} />
          <Route path="/inscricoes" element={<ListaInscricoes />} />
          <Route path="/inscricoes/:id/editar" element={<EditarInscricao />} />
          <Route path="/confirmacao/:protocolo" element={<Confirmacao />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
