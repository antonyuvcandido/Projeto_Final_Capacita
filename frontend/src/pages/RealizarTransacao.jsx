import React, { useEffect, useState } from 'react';
import api from '../services/api';

function RealizarTransacao() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function fetchTransacoes() {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/orders');
        setTransacoes(response.data);
      } catch {
        setError('Erro ao carregar transações');
      } finally {
        setLoading(false);
      }
    }
    fetchTransacoes();
  }, []);

  async function finalizarCompra() {
    try {
      const idCarrinho = localStorage.getItem('idCarrinho');
      const idUsuario = localStorage.getItem('idUsuario');
      if (!idCarrinho || !idUsuario) return setError('Carrinho ou usuário não encontrado');
      // Valor total pode ser calculado no backend, mas aqui vamos pedir ao usuário
      const valorTotal = Number(prompt('Informe o valor total da compra:'));
      if (!valorTotal || valorTotal <= 0) return setError('Valor inválido');
      await api.post('/api/orders', { idCarrinho, idUsuario, valorTotal });
      setSucesso('Compra finalizada!');
      setTimeout(() => setSucesso(''), 1500);
      // Atualiza lista de transações
      const response = await api.get('/api/orders');
      setTransacoes(response.data);
    } catch {
      setError('Erro ao finalizar compra');
    }
  }

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Transações</h2>
      <button onClick={finalizarCompra} style={{marginBottom:'2rem'}}>Finalizar Compra</button>
      {sucesso && <p style={{color:'green'}}>{sucesso}</p>}
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

export default RealizarTransacao;
