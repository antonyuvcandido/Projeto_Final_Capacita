import React, { useEffect, useState } from 'react';
import api from '../services/api';

function HistoricoPage() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistorico() {
      setLoading(true);
      setError('');
      try {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) return setError('Usuário não encontrado');
        const response = await api.get('/transacoes');
        const historico = response.data.filter(t => t.idUsuario === idUsuario);
        setTransacoes(historico);
      } catch {
        setError('Erro ao carregar histórico');
      } finally {
        setLoading(false);
      }
    }
    fetchHistorico();
  }, []);

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Histórico de Transações</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul style={{padding:0,listStyle:'none'}}>
        {transacoes.map(t => (
          <li key={t.id} style={{border:'1px solid #ccc',margin:'1rem 0',padding:'1rem',borderRadius:'8px'}}>
            <p><strong>Valor Total:</strong> R$ {t.valorTotal}</p>
            <p><strong>Data:</strong> {new Date(t.criadoEm).toLocaleString()}</p>
            <p><strong>Carrinho:</strong> {t.idCarrinho}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoricoPage;
