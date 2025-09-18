import React, { useEffect, useState } from 'react';
import DataGrid from '../components/DataGrid';
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
        const response = await api.get('/orders');
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
    <div style={{marginLeft:'220px',
                padding: '2rem',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                }}>
      <h2>Histórico de Transações</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {!loading && !error && transacoes.length === 0 && <p>Nenhuma transação encontrada.</p>}
      {/*<ul style={{padding:0,listStyle:'none'}}>
        {transacoes.map(t => (
          <li key={t.id} style={{border:'1px solid #ccc',margin:'1rem 0',padding:'1rem',borderRadius:'8px'}}>
            <p><strong>Valor Total:</strong> R$ {t.valorTotal}</p>
            <p><strong>Data:</strong> {new Date(t.criadoEm).toLocaleString()}</p>
            <p><strong>Carrinho:</strong> {t.idCarrinho}</p>
          </li>
        ))}
      </ul>*/}

      <DataGrid transacoes={transacoes} />
      
    </div>
  );
}

export default HistoricoPage;
