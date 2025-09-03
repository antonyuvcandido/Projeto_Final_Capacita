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
        // Supondo que o id do carrinho está no localStorage
        const idCarrinho = localStorage.getItem('idCarrinho');
        if (!idCarrinho) return setError('Carrinho não encontrado');
        const response = await api.get(`/carrinhos/${idCarrinho}`);
        setItens(response.data.itens || []);
      } catch (err) {
        setError('Erro ao carregar carrinho');
      } finally {
        setLoading(false);
      }
    }
    fetchCarrinho();
  }, []);

  async function alterarQuantidade(id, quantidade) {
    try {
      await api.patch(`/itens-carrinho/${id}`, { quantidade });
      setItens(itens.map(item => item.id === id ? { ...item, quantidade } : item));
      setSucesso('Quantidade alterada!');
      setTimeout(() => setSucesso(''), 1500);
    } catch {
      setError('Erro ao alterar quantidade');
    }
  }

  async function removerItem(id) {
    try {
      await api.delete(`/itens-carrinho/${id}`);
      setItens(itens.filter(item => item.id !== id));
      setSucesso('Item removido!');
      setTimeout(() => setSucesso(''), 1500);
    } catch {
      setError('Erro ao remover item');
    }
  }

  const valorTotal = itens.reduce((acc, item) => acc + Number(item.produto?.preco || 0) * item.quantidade, 0);

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Carrinho</h2>
      {sucesso && <p style={{color:'green'}}>{sucesso}</p>}
      {loading && <p>Carregando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul style={{padding:0,listStyle:'none'}}>
        {itens.map(item => (
          <li key={item.id} style={{border:'1px solid #ccc',margin:'1rem 0',padding:'1rem',borderRadius:'8px'}}>
            <h3>{item.produto?.nome}</h3>
            <p>{item.produto?.descricao}</p>
            <p><strong>Preço:</strong> R$ {item.produto?.preco}</p>
            <p>
              <strong>Quantidade:</strong> 
              <input type="number" min={1} value={item.quantidade} onChange={e => alterarQuantidade(item.id, Number(e.target.value))} style={{width:'60px',marginLeft:'1rem'}} />
            </p>
            <button onClick={() => removerItem(item.id)} style={{color:'red'}}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Valor Total: R$ {valorTotal.toFixed(2)}</h3>
    </div>
  );
}

export default CarrinhoPage;
