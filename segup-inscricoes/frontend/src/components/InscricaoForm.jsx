import React, { useState } from 'react';

const SERVICOS = [
  'Curso de Defesa Pessoal',
  'Curso de Segurança Pública',
  'Evento de Formatura',
  'Palestra sobre Cidadania',
  'Treinamento Policial',
  'Workshop de Inteligência',
  'Outro',
];

export default function InscricaoForm({ onSubmit, loading, initialData = {} }) {
  const [form, setForm] = useState({
    nomeCompleto: initialData.nomeCompleto || '',
    cpf: initialData.cpf || '',
    email: initialData.email || '',
    telefone: initialData.telefone || '',
    servicoCursoEvento: initialData.servicoCursoEvento || '',
    observacao: initialData.observacao || '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.nomeCompleto.trim()) e.nomeCompleto = 'Nome completo é obrigatório';
    if (!form.cpf.trim()) e.cpf = 'CPF é obrigatório';
    else if (!/^\d{11}$/.test(form.cpf.replace(/\D/g, ''))) e.cpf = 'CPF inválido (11 dígitos)';
    if (!form.email.trim()) e.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido';
    if (!form.telefone.trim()) e.telefone = 'Telefone é obrigatório';
    if (!form.servicoCursoEvento) e.servicoCursoEvento = 'Serviço/Curso/Evento é obrigatório';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const cpfLimpo = { ...form, cpf: form.cpf.replace(/\D/g, '') };
    onSubmit(cpfLimpo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group full">
          <label>Nome Completo *</label>
          <input
            name="nomeCompleto"
            value={form.nomeCompleto}
            onChange={handleChange}
            className={errors.nomeCompleto ? 'invalid' : ''}
            placeholder="Digite o nome completo"
          />
          {errors.nomeCompleto && <span className="error-msg">{errors.nomeCompleto}</span>}
        </div>

        <div className="form-group">
          <label>CPF *</label>
          <input
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            className={errors.cpf ? 'invalid' : ''}
            placeholder="000.000.000-00"
            maxLength={14}
          />
          {errors.cpf && <span className="error-msg">{errors.cpf}</span>}
        </div>

        <div className="form-group">
          <label>Telefone *</label>
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            className={errors.telefone ? 'invalid' : ''}
            placeholder="(91) 99999-0000"
          />
          {errors.telefone && <span className="error-msg">{errors.telefone}</span>}
        </div>

        <div className="form-group full">
          <label>E-mail *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'invalid' : ''}
            placeholder="seu@email.com"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group full">
          <label>Serviço / Curso / Evento *</label>
          <select
            name="servicoCursoEvento"
            value={form.servicoCursoEvento}
            onChange={handleChange}
            className={errors.servicoCursoEvento ? 'invalid' : ''}
          >
            <option value="">Selecione...</option>
            {SERVICOS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.servicoCursoEvento && <span className="error-msg">{errors.servicoCursoEvento}</span>}
        </div>

        <div className="form-group full">
          <label>Observação (opcional)</label>
          <textarea
            name="observacao"
            value={form.observacao}
            onChange={handleChange}
            placeholder="Informações adicionais..."
            rows={3}
          />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Inscrição'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
