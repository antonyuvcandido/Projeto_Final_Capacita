import React, { useEffect, useState } from 'react';
import api from '../services/api';

function CarrinhoPage() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function fetchCarrinho() {
      setLoading(true);
      setError('');
      try {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) return setError('Usuário não encontrado');
        
        const carrinhoResponse = await api.get(`/cart/${idUsuario}`);
        const carrinho = carrinhoResponse.data;
        
        if (!carrinho) return setError('Carrinho não encontrado');
        
        const itensResponse = await api.get(`/cartItem?idCarrinho=${carrinho.id}`);
        const itensCarrinho = itensResponse.data;
        
        // Buscar detalhes dos produtos para cada item
        const itensCompletos = await Promise.all(itensCarrinho.map(async (item) => {
          const produtoResponse = await api.get(`/products/${item.idProduto}`);
          return { ...item, produto: produtoResponse.data };
        }));
        
        setItens(itensCompletos);
      } catch (err) {
        setError('Erro ao carregar carrinho');
      } finally {
        setLoading(false);
      }
    }
    fetchCarrinho();
  }, []);

  async function alterarQuantidade(idItem, novaQuantidade) {
    try {
      await api.patch(`/cartItem/${idItem}`, { quantidade: novaQuantidade });
      setItens(itens.map(item => 
        item.id === idItem ? { ...item, quantidade: novaQuantidade } : item
      ));
    } catch (err) {
      setError('Erro ao atualizar quantidade');
    }
  }

  async function removerItem(idItem) {
    try {
      await api.delete(`/cartItem/${idItem}`);
      setItens(itens.filter(item => item.id !== idItem));
      setSucesso('Item removido com sucesso');
      setTimeout(() => setSucesso(''), 2000);
    } catch (err) {
      setError('Erro ao remover item');
    }
  }

  const valorTotal = itens.reduce((acc, item) => acc + Number(item.produto?.preco || 0) * item.quantidade, 0);

  return (
    <div style={{
      marginLeft: '220px',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        color: '#015FCA',
        marginBottom: '1.5rem',
        fontSize: '1.8rem'
      }}>Carrinho</h2>
      
      {sucesso && <p style={{
        color: '#0a8a0a',
        padding: '0.75rem',
        background: '#e8f5e9',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>{sucesso}</p>}
      
      {loading && <p style={{
        color: '#666',
        fontSize: '1.1rem'
      }}>Carregando...</p>}
      
      {error && <p style={{
        color: '#d20103',
        padding: '0.75rem',
        background: '#ffebee',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>{error}</p>}
      
      <ul style={{
        padding: 0,
        listStyle: 'none'
      }}>
        {itens.map(item => (
          <li key={item.id} style={{
            border: '1px solid #e0e0e0',
            margin: '1rem 0',
            padding: '1.5rem',
            borderRadius: '8px',
            background: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{
              color: '#333',
              marginTop: 0,
              fontSize: '1.3rem'
            }}>{item.produto?.nome}</h3>
            
            <p style={{
              color: '#666',
              marginBottom: '1rem'
            }}>{item.produto?.descricao}</p>
            
            <p style={{
              fontWeight: 'bold',
              color: '#015FCA',
              fontSize: '1.1rem'
            }}><strong>Preço:</strong> R$ {item.produto?.preco}</p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <strong style={{marginRight: '0.5rem'}}>Quantidade:</strong> 
              <input 
                type="number" 
                min={1} 
                value={item.quantidade} 
                onChange={e => alterarQuantidade(item.id, Number(e.target.value))} 
                style={{
                  width: '60px',
                  marginLeft: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid #bdbdbd',
                  borderRadius: '4px'
                }} 
              />
            </div>
            
            <button 
              onClick={() => removerItem(item.id)} 
              style={{
                padding: '0.5rem 1rem',
                background: '#ffebee',
                color: '#d20103',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        textAlign: 'right'
      }}>
        <h3 style={{
          color: '#015FCA',
          fontSize: '1.4rem',
          margin: 0
        }}>Valor Total: R$ {valorTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default CarrinhoPage;
