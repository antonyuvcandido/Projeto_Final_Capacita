import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'
import ProductSlider from '../components/ProductSlider'
import SearchBar from '../components/SearchBar'

function HomePage() {
    const [produtos, setProdutos] = useState([])
    const [produtosFiltrados, setProdutosFiltrados] = useState([])
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('')

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            setError('')
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories'),
                ])
                setProdutos(prodRes.data)
                setProdutosFiltrados(prodRes.data)
                setCategorias(catRes.data)
            } catch {
                setError('Erro ao carregar dados')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        let filtered = [...produtos]
        
        // Aplicar filtro de pesquisa
        if (searchTerm) {
            filtered = filtered.filter(produto =>
                produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Aplicar ordenação
        if (sortBy) {
            filtered.sort((a, b) => {
                switch (sortBy) {
                    case 'name-asc':
                        return a.nome.localeCompare(b.nome)
                    case 'name-desc':
                        return b.nome.localeCompare(a.nome)
                    case 'price-asc':
                        return parseFloat(a.preco) - parseFloat(b.preco)
                    case 'price-desc':
                        return parseFloat(b.preco) - parseFloat(a.preco)
                    default:
                        return 0
                }
            })
        }

        setProdutosFiltrados(filtered)
    }, [produtos, searchTerm, sortBy])

    return (
        <div
            style={{
                marginLeft: '220px',
                padding: '2rem',
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
            }}
        >
            {loading && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Carregando produtos...</p>
                </div>
            )}

            {!loading && <ProductSlider />}

            {error && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}

            {/* Barra de pesquisa e ordenação */}
            {!loading && !error && (
                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>
            )}

            {/* Header da seção de produtos */}
            {!loading && !error && (
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem', color: '#333' }}>
                        Nossos Produtos {produtosFiltrados.length > 0 && `(${produtosFiltrados.length})`}
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '24px',
                            marginTop: '1rem',
                        }}
                    >
                        {produtosFiltrados.map((produto) => (
                            <div
                                key={produto.id}
                                style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    padding: '0',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-8px)'
                                    e.currentTarget.style.boxShadow =
                                        '0 8px 25px rgba(0,0,0,0.15)'
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)'
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={
                                            produto.imagem
                                                ? `http://localhost:3001${produto.imagem}`
                                                : `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                                                      produto.nome
                                                  )}`
                                        }
                                        alt={produto.nome}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    {produto.quantidade <= 5 && (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                backgroundColor: '#ff5722',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Últimas unidades!
                                        </span>
                                    )}
                                </div>

                                <div style={{ padding: '20px' }}>
                                    <h3
                                        style={{
                                            marginTop: '0',
                                            marginBottom: '8px',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            color: '#333',
                                        }}
                                    >
                                        {produto.nome}
                                    </h3>

                                    <p
                                        style={{
                                            color: '#666',
                                            fontSize: '14px',
                                            margin: '8px 0',
                                            lineHeight: '1.4',
                                            height: '40px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {produto.descricao?.substring(0, 80)}...
                                    </p>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '16px',
                                        }}
                                    >
                                        <div>
                                            <span
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    color: '#2e7d32',
                                                }}
                                            >
                                                R${' '}
                                                {parseFloat(
                                                    produto.preco
                                                ).toFixed(2)}
                                            </span>
                                            <p
                                                style={{
                                                    margin: '4px 0 0 0',
                                                    fontSize: '12px',
                                                    color: '#666',
                                                }}
                                            >
                                                Estoque: {produto.quantidade}{' '}
                                                unidades
                                            </p>
                                        </div>

                                        <Link
                                            to={`/produtos/${produto.id}`}
                                            style={{
                                                textDecoration: 'none',
                                                backgroundColor: '#1976d2',
                                                color: 'white',
                                                padding: '10px 16px',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                transition:
                                                    'background-color 0.2s ease',
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    '#1565c0')
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    '#1976d2')
                                            }
                                        >
                                            Ver detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {produtos.length === 0 && !loading && !error && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '3rem',
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                marginTop: '2rem',
                            }}
                        >
                            <h3>Nenhum produto encontrado</h3>
                            <p style={{ color: '#666' }}>
                                Adicione alguns produtos para começar!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default HomePage
