import React, { useEffect, useState } from 'react';
import api from '../services/api';

function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function fetchUsuario() {
      setLoading(true);
      setError('');
      try {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) return setError('Usuário não encontrado');
        const response = await api.get(`/users/${idUsuario}`);
        setUsuario(response.data);
        setForm({ nome: response.data.nome, email: response.data.email, senha: '' });
      } catch {
        setError('Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    }
    fetchUsuario();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSucesso('');
    try {
      const idUsuario = localStorage.getItem('idUsuario');
      await api.put(`/users/${idUsuario}`, form);
      setSucesso('Dados atualizados com sucesso!');
      setEditando(false);
      setTimeout(() => setSucesso(''), 1500);
    } catch {
      setError('Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div style={{marginLeft:'220px',padding:'2rem'}}><h2>Perfil</h2><p>Carregando...</p></div>;

  if (error) return <div style={{marginLeft:'220px',padding:'2rem'}}><h2>Perfil</h2><p style={{color:'red'}}>{error}</p></div>;

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Perfil</h2>
      {sucesso && <p style={{color:'green'}}>{sucesso}</p>}
      {!editando ? (
        <div>
          <p><strong>Nome:</strong> {usuario?.nome}</p>
          <p><strong>Email:</strong> {usuario?.email}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{maxWidth:'400px',background:'#f9f9f9',padding:'2rem',borderRadius:'8px'}}>
          <input placeholder="Nome" value={form.nome} onChange={e => setForm(f => ({...f, nome: e.target.value}))} required style={{marginBottom:'1rem',width:'100%'}} />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required style={{marginBottom:'1rem',width:'100%'}} />
          <input type="password" placeholder="Nova senha (opcional)" value={form.senha} onChange={e => setForm(f => ({...f, senha: e.target.value}))} style={{marginBottom:'1rem',width:'100%'}} />
          <button type="submit" style={{width:'100%'}}>Salvar</button>
          <button type="button" onClick={() => setEditando(false)} style={{width:'100%',marginTop:'1rem'}}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default PerfilPage;
