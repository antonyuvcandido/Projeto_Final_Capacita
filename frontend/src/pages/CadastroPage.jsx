import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CadastroPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSucesso('');
    try {
      await api.post('/usuarios', form);
      setSucesso('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:'400px',background:'#f9f9f9',padding:'2rem',borderRadius:'8px'}}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm(f => ({...f, nome: e.target.value}))} required style={{marginBottom:'1rem',width:'100%'}} />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required style={{marginBottom:'1rem',width:'100%'}} />
        <input type="password" placeholder="Senha" value={form.senha} onChange={e => setForm(f => ({...f, senha: e.target.value}))} required style={{marginBottom:'1rem',width:'100%'}} />
        <button type="submit" disabled={loading} style={{width:'100%'}}>Cadastrar</button>
        {error && <p style={{color:'red'}}>{error}</p>}
        {sucesso && <p style={{color:'green'}}>{sucesso}</p>}
      </form>
    </div>
  );
}

export default CadastroPage;
