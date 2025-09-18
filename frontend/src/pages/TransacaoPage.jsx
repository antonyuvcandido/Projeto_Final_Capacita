import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function TransacaoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transacao, setTransacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function fetchTransacao() {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/orders/${id}`);
        setTransacao(response.data);
      } catch {
        setError('Erro ao carregar transação');
      } finally {
        setLoading(false);
      }
    }
    fetchTransacao();
  }, [id]);

  var statusMap = { 'pending': 'Pendente', 'completed': 'Concluído', 'canceled': 'Cancelado' };
  var status = transacao ? statusMap[transacao.status] || 'Desconhecido' : '';

  if (loading) {
    return (
      <div style={{ marginLeft: '220px', padding: '2rem', textAlign: 'center' }}>
        Carregando transação...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginLeft: '220px', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/historico')} style={{
          padding: '8px 16px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div style={{
      marginLeft: '220px',
      padding: '2rem',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <button
        onClick={() => navigate('/historico')}
        style={{
          marginBottom: '2rem',
          padding: '8px 16px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ← Voltar
      </button>

      <div style={{
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 25px',
        minHeight: '400px',
        background: '#fff'
      }}>
        <h2 style={{ margin: "-15px" }}>Detalhes da Transação</h2>
        <p style={{ marginLeft: "-15px", color: 'red' }}>Não compartilhe as informações abaixo com pessoas que não confia</p>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 2 }}>
            {transacao?.carrinho?.itens?.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src={item.produto?.imagem ? `http://localhost:3001${item.produto.imagem}` : "https://via.placeholder.com/150"}
                  alt={item.produto?.nome}
                  style={{
                    width: '100%',
                    maxWidth: '187.5px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ margin: 0 }}><strong>Produto:</strong> {item.produto?.nome}</p>
                  <p style={{ margin: 0 }}><strong>Preço:</strong> R$ {Number(item.produto?.preco).toFixed(2)}</p>
                  <p style={{ margin: 0 }}><strong>Quantidade:</strong> {item.quantidade}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 2 }}>
            {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
            <p><strong>ID da Transação:</strong> {transacao.id}</p>
            <p><strong>Valor Total:</strong> R$ {Number(transacao.valorTotal).toFixed(2)}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Feita em:</strong> {new Date(transacao.criadoEm).toLocaleString()}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TransacaoPage;
