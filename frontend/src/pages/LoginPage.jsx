import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/users/login', { email, senha });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:'400px',background:'#f9f9f9',padding:'2rem',borderRadius:'8px'}}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{marginBottom:'1rem',width:'100%'}} />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required style={{marginBottom:'1rem',width:'100%'}} />
        <button type="submit" disabled={loading} style={{width:'100%'}}>Entrar</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
