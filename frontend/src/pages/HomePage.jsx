import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function HomePage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/produtos'),
          api.get('/categorias')
        ]);
        setProdutos(prodRes.data);
        setCategorias(catRes.data);
      } catch {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Bem-vindo à Loja de Produtos!</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div style={{margin:'2rem 0'}}>
        <p><strong>Total de produtos:</strong> {produtos.length}</p>
        <p><strong>Total de categorias:</strong> {categorias.length}</p>
      </div>
      <div style={{margin:'2rem 0'}}>
        <Link to="/produtos" style={{marginRight:'1rem'}}>Ver Produtos</Link>
        <Link to="/carrinho" style={{marginRight:'1rem'}}>Meu Carrinho</Link>
        <Link to="/historico" style={{marginRight:'1rem'}}>Histórico</Link>
        <Link to="/perfil">Meu Perfil</Link>
      </div>
    </div>
  );
}

export default HomePage;
