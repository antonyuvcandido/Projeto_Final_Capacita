import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

function ProdutoDetalhePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [produto, setProduto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [quantidade, setQuantidade] = useState(1)

    useEffect(() => {
        async function fetchProduto() {
            try {
                const response = await api.get(`/products/${id}`)
                setProduto(response.data)
            } catch (err) {
                setError('Produto não encontrado')
            } finally {
                setLoading(false)
            }
        }
        fetchProduto()
    }, [id])

    const handleAddToCart = async () => {
        try {
            // Por enquanto, usando o primeiro usuário como padrão
            // Em uma aplicação real, isso viria do sistema de autenticação
            const users = await api.get('/users')
            const userId = users.data[0]?.id

            if (!userId) {
                alert('Erro: Nenhum usuário encontrado. Faça login primeiro.')
                return
            }

            await api.post(`/cart-items/user/${userId}`, {
                idProduto: produto.id,
                quantidade: quantidade,
            })

            alert(
                `${quantidade} unidade(s) de ${produto.nome} adicionada(s) ao carrinho com sucesso!`
            )
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error)
            if (error.response?.data?.error) {
                alert(`Erro: ${error.response.data.error}`)
            } else {
                alert('Erro ao adicionar produto ao carrinho. Tente novamente.')
            }
        }
    }

    if (loading) {
        return (
            <div
                style={{
                    marginLeft: '220px',
                    padding: '2rem',
                    textAlign: 'center',
                }}
            >
                <p>Carregando produto...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div
                style={{
                    marginLeft: '220px',
                    padding: '2rem',
                    textAlign: 'center',
                }}
            >
                <p style={{ color: 'red' }}>{error}</p>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '1rem',
                        padding: '10px 20px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Voltar à Home
                </button>
            </div>
        )
    }

    return (
        <div
            style={{
                marginLeft: '220px',
                padding: '2rem',
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
            }}
        >
            <button
                onClick={() => navigate('/')}
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

            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    maxWidth: '1200px',
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '3rem',
                        alignItems: 'start',
                    }}
                >
                    {/* Imagem do produto */}
                    <div>
                        <img
                            src={
                                produto.imagem
                                    ? `http://localhost:3001${produto.imagem}`
                                    : `https://via.placeholder.com/500x400?text=${encodeURIComponent(
                                          produto.nome
                                      )}`
                            }
                            alt={produto.nome}
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                height: '400px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                            }}
                        />
                    </div>

                    {/* Informações do produto */}
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <span
                                style={{
                                    backgroundColor: '#e3f2fd',
                                    color: '#1976d2',
                                    padding: '4px 12px',
                                    borderRadius: '16px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                }}
                            >
                                {produto.categoria?.nome || 'Sem categoria'}
                            </span>
                        </div>

                        <h1
                            style={{
                                fontSize: '2rem',
                                fontWeight: '700',
                                color: '#333',
                                marginBottom: '1rem',
                                lineHeight: '1.2',
                            }}
                        >
                            {produto.nome}
                        </h1>

                        <p
                            style={{
                                fontSize: '1.1rem',
                                color: '#666',
                                lineHeight: '1.6',
                                marginBottom: '2rem',
                            }}
                        >
                            {produto.descricao}
                        </p>

                        <div
                            style={{
                                padding: '1.5rem',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                marginBottom: '2rem',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    color: '#2e7d32',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                R$ {parseFloat(produto.preco).toFixed(2)}
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1rem',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color:
                                            produto.quantidade > 5
                                                ? '#2e7d32'
                                                : '#ff5722',
                                        fontWeight: '500',
                                    }}
                                >
                                    {produto.quantidade > 0
                                        ? `${produto.quantidade} em estoque`
                                        : 'Fora de estoque'}
                                </span>

                                {produto.quantidade <= 5 &&
                                    produto.quantidade > 0 && (
                                        <span
                                            style={{
                                                backgroundColor: '#ff5722',
                                                color: 'white',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Últimas unidades!
                                        </span>
                                    )}
                            </div>
                        </div>

                        {/* Controles de quantidade e compra */}
                        {produto.quantidade > 0 && (
                            <div
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        marginBottom: '1.5rem',
                                    }}
                                >
                                    <label
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#333',
                                        }}
                                    >
                                        Quantidade:
                                    </label>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                setQuantidade(
                                                    Math.max(1, quantidade - 1)
                                                )
                                            }
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                backgroundColor: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            min="1"
                                            max={produto.quantidade}
                                            value={quantidade}
                                            onChange={(e) =>
                                                setQuantidade(
                                                    Math.min(
                                                        produto.quantidade,
                                                        Math.max(
                                                            1,
                                                            parseInt(
                                                                e.target.value
                                                            ) || 1
                                                        )
                                                    )
                                                )
                                            }
                                            style={{
                                                width: '60px',
                                                padding: '6px',
                                                textAlign: 'center',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                fontSize: '16px',
                                            }}
                                        />

                                        <button
                                            onClick={() =>
                                                setQuantidade(
                                                    Math.min(
                                                        produto.quantidade,
                                                        quantidade + 1
                                                    )
                                                )
                                            }
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                backgroundColor: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
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
                                    Adicionar ao Carrinho
                                </button>

                                <div
                                    style={{
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        backgroundColor: '#e8f5e8',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        color: '#2e7d32',
                                    }}
                                >
                                    <strong>
                                        Total: R${' '}
                                        {(
                                            parseFloat(produto.preco) *
                                            quantidade
                                        ).toFixed(2)}
                                    </strong>
                                </div>
                            </div>
                        )}

                        {produto.quantidade === 0 && (
                            <div
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: '#ffebee',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    color: '#c62828',
                                }}
                            >
                                <h3>Produto Indisponível</h3>
                                <p>
                                    Este produto está temporariamente fora de
                                    estoque.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProdutoDetalhePage
