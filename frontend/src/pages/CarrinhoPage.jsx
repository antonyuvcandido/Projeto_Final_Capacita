import React, { useEffect, useState } from 'react'
import api from '../services/api'

function CarrinhoPage() {
    const [itens, setItens] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState('')

    useEffect(() => {
        async function fetchCarrinho() {
            setLoading(true)
            setError('')
            try {
                // Por enquanto, usando o primeiro usuário como padrão
                // Em uma aplicação real, isso viria do sistema de autenticação
                const users = await api.get('/users')
                const userId = users.data[0]?.id

                console.log('UserId encontrado:', userId)

                if (!userId) {
                    setError('Nenhum usuário encontrado. Faça login primeiro.')
                    return
                }

                // Buscar carrinho do usuário com itens incluídos
                console.log('Buscando carrinho para usuário:', userId)
                const carrinhoResponse = await api.get(`/carts/user/${userId}`)
                const carrinho = carrinhoResponse.data

                console.log('Carrinho recebido:', carrinho)

                if (!carrinho || !carrinho.itens) {
                    console.log('Carrinho vazio ou sem itens')
                    setItens([])
                    return
                }

                console.log('Itens do carrinho:', carrinho.itens)
                setItens(carrinho.itens)
            } catch (err) {
                console.error('Erro ao carregar carrinho:', err)
                if (err.response?.status === 404) {
                    setError('Carrinho vazio ou não encontrado')
                    setItens([])
                } else {
                    setError('Erro ao carregar carrinho')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchCarrinho()
    }, [])

    async function alterarQuantidade(idItem, novaQuantidade) {
        if (novaQuantidade <= 0) return

        try {
            await api.put(`/cart-items/${idItem}`, {
                quantidade: novaQuantidade,
            })
            setItens(
                itens.map((item) =>
                    item.id === idItem
                        ? { ...item, quantidade: novaQuantidade }
                        : item
                )
            )
            setSucesso('Quantidade atualizada com sucesso')
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            console.error('Erro ao atualizar quantidade:', err)
            setError('Erro ao atualizar quantidade')
            setTimeout(() => setError(''), 3000)
        }
    }

    async function removerItem(idItem) {
        if (
            !window.confirm(
                'Tem certeza que deseja remover este item do carrinho?'
            )
        )
            return

        try {
            await api.delete(`/cart-items/${idItem}`)
            setItens(itens.filter((item) => item.id !== idItem))
            setSucesso('Item removido com sucesso')
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            console.error('Erro ao remover item:', err)
            setError('Erro ao remover item')
            setTimeout(() => setError(''), 3000)
        }
    }

    const valorTotal = itens.reduce(
        (acc, item) =>
            acc + parseFloat(item.produto?.preco || 0) * item.quantidade,
        0
    )

    return (
        <div
            style={{
                marginLeft: '220px',
                padding: '2rem',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <h2
                style={{
                    color: '#015FCA',
                    marginBottom: '1.5rem',
                    fontSize: '1.8rem',
                }}
            >
                Carrinho
            </h2>

            {sucesso && (
                <p
                    style={{
                        color: '#0a8a0a',
                        padding: '0.75rem',
                        background: '#e8f5e9',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                    }}
                >
                    {sucesso}
                </p>
            )}

            {loading && (
                <p
                    style={{
                        color: '#666',
                        fontSize: '1.1rem',
                    }}
                >
                    Carregando...
                </p>
            )}

            {error && (
                <p
                    style={{
                        color: '#d20103',
                        padding: '0.75rem',
                        background: '#ffebee',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                    }}
                >
                    {error}
                </p>
            )}

            {!loading && !error && itens.length === 0 && (
                <div
                    style={{
                        textAlign: 'center',
                        padding: '3rem',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        marginTop: '2rem',
                    }}
                >
                    <h3 style={{ color: '#666', marginBottom: '1rem' }}>
                        Carrinho Vazio
                    </h3>
                    <p style={{ color: '#999', marginBottom: '2rem' }}>
                        Você ainda não adicionou nenhum produto ao seu carrinho.
                    </p>
                    <a
                        href="/"
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#015FCA',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: '500',
                        }}
                    >
                        Continuar Comprando
                    </a>
                </div>
            )}

            <ul
                style={{
                    padding: 0,
                    listStyle: 'none',
                }}
            >
                {itens.map((item) => (
                    <li
                        key={item.id}
                        style={{
                            border: '1px solid #e0e0e0',
                            margin: '1rem 0',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            background: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* Imagem do produto */}
                        <div style={{ flexShrink: 0 }}>
                            <img
                                src={
                                    item.produto?.imagem
                                        ? `http://localhost:3001${item.produto.imagem}`
                                        : `https://via.placeholder.com/100x100?text=${encodeURIComponent(
                                              item.produto?.nome || 'Produto'
                                          )}`
                                }
                                alt={item.produto?.nome}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                    border: '1px solid #e0e0e0',
                                }}
                            />
                        </div>

                        {/* Informações do produto */}
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    color: '#333',
                                    marginTop: 0,
                                    marginBottom: '0.5rem',
                                    fontSize: '1.3rem',
                                }}
                            >
                                {item.produto?.nome}
                            </h3>

                            <p
                                style={{
                                    color: '#666',
                                    marginBottom: '1rem',
                                    fontSize: '14px',
                                }}
                            >
                                {item.produto?.descricao}
                            </p>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    marginBottom: '1rem',
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#015FCA',
                                        fontSize: '1.1rem',
                                        margin: 0,
                                    }}
                                >
                                    R${' '}
                                    {parseFloat(
                                        item.produto?.preco || 0
                                    ).toFixed(2)}
                                </p>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <label style={{ fontWeight: '500' }}>
                                        Quantidade:
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={item.quantidade}
                                        onChange={(e) =>
                                            alterarQuantidade(
                                                item.id,
                                                Number(e.target.value)
                                            )
                                        }
                                        style={{
                                            width: '60px',
                                            padding: '0.5rem',
                                            border: '1px solid #bdbdbd',
                                            borderRadius: '4px',
                                            textAlign: 'center',
                                        }}
                                    />
                                </div>

                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#2e7d32',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Subtotal: R${' '}
                                    {(
                                        parseFloat(item.produto?.preco || 0) *
                                        item.quantidade
                                    ).toFixed(2)}
                                </div>
                            </div>

                            <button
                                onClick={() => removerItem(item.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: '#ffebee',
                                    color: '#d20103',
                                    border: '1px solid #ffcdd2',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        '#ffcdd2'
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        '#ffebee'
                                }}
                            >
                                🗑️ Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {itens.length > 0 && (
                <div
                    style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '1.1rem',
                                color: '#666',
                            }}
                        >
                            Total de itens:{' '}
                            {itens.reduce(
                                (acc, item) => acc + item.quantidade,
                                0
                            )}
                        </span>
                        <span
                            style={{
                                fontSize: '1.1rem',
                                color: '#666',
                            }}
                        >
                            Produtos diferentes: {itens.length}
                        </span>
                    </div>

                    <hr
                        style={{
                            border: 'none',
                            borderTop: '1px solid #e0e0e0',
                            margin: '1rem 0',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <h3
                            style={{
                                color: '#015FCA',
                                fontSize: '1.4rem',
                                margin: 0,
                            }}
                        >
                            Valor Total:
                        </h3>
                        <h3
                            style={{
                                color: '#2e7d32',
                                fontSize: '1.6rem',
                                margin: 0,
                                fontWeight: 'bold',
                            }}
                        >
                            R$ {valorTotal.toFixed(2)}
                        </h3>
                    </div>

                    <div
                        style={{
                            marginTop: '1.5rem',
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <button
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#015FCA',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#0146a3')
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#015FCA')
                            }
                        >
                            Finalizar Compra
                        </button>

                        <a
                            href="/"
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: 'transparent',
                                color: '#015FCA',
                                border: '2px solid #015FCA',
                                borderRadius: '6px',
                                fontSize: '16px',
                                fontWeight: '600',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                display: 'block',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    '#015FCA'
                                e.currentTarget.style.color = 'white'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    'transparent'
                                e.currentTarget.style.color = '#015FCA'
                            }}
                        >
                            Continuar Comprando
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CarrinhoPage
