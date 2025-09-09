import React, { useEffect, useState } from 'react';
import api from '../services/api';

function EstoquePage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProdutos(prodRes.data);
        setCategorias(catRes.data);
      } catch {
        setError('Erro ao carregar estoque');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function editarQuantidade(id, quantidade) {
    try {
      await api.patch(`/produtos/${id}`, { quantidade });
      setProdutos(produtos.map(p => p.id === id ? { ...p, quantidade } : p));
      setSucesso('Quantidade atualizada!');
      setTimeout(() => setSucesso(''), 1500);
    } catch {
      setError('Erro ao atualizar quantidade');
    }
  }

  async function removerProduto(id) {
    try {
      await api.delete(`/products/${id}`);
      setProdutos(produtos.filter(p => p.id !== id));
      setSucesso('Produto removido!');
      setTimeout(() => setSucesso(''), 1500);
    } catch {
      setError('Erro ao remover produto');
    }
  }

  const produtosFiltrados = produtos.filter(p => !filtroCategoria || p.idCategoria === filtroCategoria);

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Estoque</h2>
      {sucesso && <p style={{color:'green'}}>{sucesso}</p>}
      {loading && <p>Carregando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div style={{marginBottom:'1rem'}}>
        <label>
          Filtro por categoria:{' '}
          <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
            <option value="">Todas</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </label>
      </div>
      <ul style={{padding:0,listStyle:'none'}}>
        {produtosFiltrados.map(produto => (
          <li key={produto.id} style={{border:'1px solid #ccc',margin:'1rem 0',padding:'1rem',borderRadius:'8px'}}>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p>
              <strong>Quantidade:</strong>
              <input type="number" min={0} value={produto.quantidade} onChange={e => editarQuantidade(produto.id, Number(e.target.value))} style={{width:'60px',marginLeft:'1rem'}} />
            </p>
            <p><strong>Categoria:</strong> {produto.categoria?.nome || 'Sem categoria'}</p>
            <button onClick={() => removerProduto(produto.id)} style={{color:'red'}}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstoquePage;
