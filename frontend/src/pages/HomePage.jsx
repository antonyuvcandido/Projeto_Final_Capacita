import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import ProductSlider from '../components/ProductSlider';

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
          api.get('/products'),
          api.get('/categories')
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
      {loading && <p>Carregando...</p>}

      {!loading && <ProductSlider />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/*<div style={{ margin: '2rem 0' }}>
        <p><strong>Total de produtos:</strong> {produtos.length}</p>
        <p><strong>Total de categorias:</strong> {categorias.length}</p>
      </div>*/}
      
      {/* Cards de produtos */}
      {!loading && !error && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '1rem'
          }}>
            {produtos.map(produto => (
              <div key={produto.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                backgroundColor: 'white'
              }} 
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src={produto.imageUrl || `https://via.placeholder.com/150?text=${produto.nome}`} 
                  alt={produto.nome}
                  style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px'}}
                />
                <h4 style={{marginTop: '10px', marginBottom: '5px'}}>{produto.nome}</h4>
                <p style={{color: '#666', fontSize: '14px', margin: '5px 0'}}>{produto.descricao?.substring(0, 60)}...</p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                  <span style={{fontWeight: 'bold', color: '#2e7d32'}}>R$ {produto.price?.toFixed(2)}</span> {/*está dando erro no preço!!!*/}
                  <Link to={`/produtos/${produto.id}`} style={{
                    textDecoration: 'none',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>Ver detalhes</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
