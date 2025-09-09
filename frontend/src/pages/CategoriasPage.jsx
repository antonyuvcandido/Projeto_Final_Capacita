import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function CategoriasPage() {
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [form, setForm] = useState({ nome: '', descricao: '' })
    const [editId, setEditId] = useState(null)
    const [editForm, setEditForm] = useState({ nome: '', descricao: '' })
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategorias()
    }, [])

    async function fetchCategorias() {
        try {
            setLoading(true)
            const response = await api.get('/categories')
            setCategorias(response.data)
        } catch (err) {
            setError('Erro ao carregar categorias')
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await api.post('/categories', form)
            setForm({ nome: '', descricao: '' })
            setSucesso('Categoria cadastrada com sucesso!')
            setError('')
            await fetchCategorias()
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            setError('Erro ao cadastrar categoria')
            setSucesso('')
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Deseja realmente excluir esta categoria?')) return
        try {
            await api.delete(`/categories/${id}`)
            setCategorias(categorias.filter((c) => c.id !== id))
            setSucesso('Categoria excluída com sucesso!')
            setError('')
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            setError('Erro ao excluir categoria')
            setSucesso('')
        }
    }

    function handleEdit(categoria) {
        setEditId(categoria.id)
        setEditForm({
            nome: categoria.nome,
            descricao: categoria.descricao || '',
        })
    }

    async function handleEditSubmit(e) {
        e.preventDefault()
        try {
            await api.put(`/categories/${editId}`, editForm)
            setEditId(null)
            setSucesso('Categoria editada com sucesso!')
            setError('')
            await fetchCategorias()
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            setError('Erro ao editar categoria')
            setSucesso('')
        }
    }

    return (
        <div
            style={{
                marginLeft: '220px',
                padding: '2rem',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }}
        >
            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '2rem',
                    }}
                >
                    <h2
                        style={{
                            color: '#015FCA',
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            margin: 0,
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        Gerenciar Categorias
                    </h2>

                    <button
                        onClick={() => navigate('/produtos')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#f3f4f6',
                            color: '#374151',
                            border: '2px solid #d1d5db',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#e5e7eb'
                            e.target.style.borderColor = '#9ca3af'
                            e.target.style.transform = 'translateY(-1px)'
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = '#f3f4f6'
                            e.target.style.borderColor = '#d1d5db'
                            e.target.style.transform = 'translateY(0)'
                        }}
                    >
                        ← Voltar para Produtos
                    </button>
                </div>

                {sucesso && (
                    <div
                        style={{
                            marginBottom: '1.5rem',
                            padding: '0.75rem',
                            background: '#d1fae5',
                            border: '1px solid #a7f3d0',
                            borderRadius: '8px',
                            color: '#065f46',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                        }}
                    >
                        {sucesso}
                    </div>
                )}

                {loading && (
                    <div
                        style={{
                            marginBottom: '1.5rem',
                            padding: '0.75rem',
                            background: '#e0f2fe',
                            border: '1px solid #bae6fd',
                            borderRadius: '8px',
                            color: '#0c4a6e',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                        }}
                    >
                        Carregando...
                    </div>
                )}

                {error && (
                    <div
                        style={{
                            marginBottom: '1.5rem',
                            padding: '0.75rem',
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            borderRadius: '8px',
                            color: '#dc2626',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Formulário de Cadastro */}
                <div
                    style={{
                        background: '#fff',
                        padding: '2rem',
                        borderRadius: '15px',
                        marginBottom: '2rem',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e8ecef',
                    }}
                >
                    <h3
                        style={{
                            color: '#015FCA',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                        }}
                    >
                        Cadastrar Nova Categoria
                    </h3>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            alignItems: 'end',
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    color: '#015FCA',
                                    fontWeight: '500',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Nome da Categoria
                            </label>
                            <input
                                placeholder="Digite o nome da categoria"
                                value={form.nome}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        nome: e.target.value,
                                    }))
                                }
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e8ecef',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderColor = '#015FCA')
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor = '#e8ecef')
                                }
                            />
                        </div>

                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    color: '#015FCA',
                                    fontWeight: '500',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Descrição
                            </label>
                            <input
                                placeholder="Descrição da categoria"
                                value={form.descricao}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        descricao: e.target.value,
                                    }))
                                }
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e8ecef',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderColor = '#015FCA')
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor = '#e8ecef')
                                }
                            />
                        </div>

                        <div
                            style={{ gridColumn: '1 / -1', marginTop: '1rem' }}
                        >
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1.5rem',
                                    background:
                                        'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow:
                                        '0 4px 15px rgba(1, 95, 202, 0.3)',
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform =
                                        'translateY(-2px)'
                                    e.target.style.boxShadow =
                                        '0 6px 20px rgba(1, 95, 202, 0.4)'
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'translateY(0)'
                                    e.target.style.boxShadow =
                                        '0 4px 15px rgba(1, 95, 202, 0.3)'
                                }}
                            >
                                Cadastrar Categoria
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lista de Categorias */}
                <div
                    style={{
                        background: '#fff',
                        padding: '2rem',
                        borderRadius: '15px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e8ecef',
                    }}
                >
                    <h3
                        style={{
                            color: '#015FCA',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                        }}
                    >
                        Categorias Cadastradas
                    </h3>

                    {categorias.length === 0 ? (
                        <p
                            style={{
                                textAlign: 'center',
                                color: '#666',
                                fontSize: '1rem',
                                margin: '2rem 0',
                            }}
                        >
                            Nenhuma categoria cadastrada ainda.
                        </p>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gap: '1rem',
                            }}
                        >
                            {categorias.map((categoria) => (
                                <div
                                    key={categoria.id}
                                    style={{
                                        padding: '1.5rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '10px',
                                        background: '#f9fafb',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {editId === categoria.id ? (
                                        <form
                                            onSubmit={handleEditSubmit}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '1rem',
                                                alignItems: 'end',
                                            }}
                                        >
                                            <div>
                                                <label
                                                    style={{
                                                        display: 'block',
                                                        color: '#015FCA',
                                                        fontWeight: '500',
                                                        marginBottom: '0.3rem',
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    Nome
                                                </label>
                                                <input
                                                    value={editForm.nome}
                                                    onChange={(e) =>
                                                        setEditForm((f) => ({
                                                            ...f,
                                                            nome: e.target
                                                                .value,
                                                        }))
                                                    }
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem',
                                                        border: '2px solid #015FCA',
                                                        borderRadius: '6px',
                                                        fontSize: '1rem',
                                                        outline: 'none',
                                                        boxSizing: 'border-box',
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        display: 'block',
                                                        color: '#015FCA',
                                                        fontWeight: '500',
                                                        marginBottom: '0.3rem',
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    Descrição
                                                </label>
                                                <input
                                                    value={editForm.descricao}
                                                    onChange={(e) =>
                                                        setEditForm((f) => ({
                                                            ...f,
                                                            descricao:
                                                                e.target.value,
                                                        }))
                                                    }
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem',
                                                        border: '2px solid #015FCA',
                                                        borderRadius: '6px',
                                                        fontSize: '1rem',
                                                        outline: 'none',
                                                        boxSizing: 'border-box',
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    gridColumn: '1 / -1',
                                                    display: 'flex',
                                                    gap: '0.5rem',
                                                    marginTop: '1rem',
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        background:
                                                            'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition:
                                                            'all 0.3s ease',
                                                    }}
                                                    onMouseOver={(e) =>
                                                        (e.target.style.transform =
                                                            'translateY(-1px)')
                                                    }
                                                    onMouseOut={(e) =>
                                                        (e.target.style.transform =
                                                            'translateY(0)')
                                                    }
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setEditId(null)
                                                    }
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        background: '#f3f4f6',
                                                        color: '#374151',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '6px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition:
                                                            'all 0.3s ease',
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.background =
                                                            '#e5e7eb'
                                                        e.target.style.transform =
                                                            'translateY(-1px)'
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.background =
                                                            '#f3f4f6'
                                                        e.target.style.transform =
                                                            'translateY(0)'
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '1rem',
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <h4
                                                        style={{
                                                            color: '#374151',
                                                            fontSize: '1.1rem',
                                                            fontWeight: '600',
                                                            margin: '0 0 0.5rem 0',
                                                        }}
                                                    >
                                                        {categoria.nome}
                                                    </h4>
                                                    <p
                                                        style={{
                                                            color: '#6b7280',
                                                            fontSize: '0.9rem',
                                                            margin: 0,
                                                            lineHeight: '1.4',
                                                        }}
                                                    >
                                                        {categoria.descricao ||
                                                            'Sem descrição'}
                                                    </p>
                                                </div>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        gap: '0.5rem',
                                                        marginLeft: '1rem',
                                                    }}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                categoria
                                                            )
                                                        }
                                                        style={{
                                                            padding:
                                                                '0.5rem 1rem',
                                                            background:
                                                                'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '500',
                                                            cursor: 'pointer',
                                                            transition:
                                                                'all 0.3s ease',
                                                        }}
                                                        onMouseOver={(e) =>
                                                            (e.target.style.transform =
                                                                'translateY(-1px)')
                                                        }
                                                        onMouseOut={(e) =>
                                                            (e.target.style.transform =
                                                                'translateY(0)')
                                                        }
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                categoria.id
                                                            )
                                                        }
                                                        style={{
                                                            padding:
                                                                '0.5rem 1rem',
                                                            background:
                                                                'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '500',
                                                            cursor: 'pointer',
                                                            transition:
                                                                'all 0.3s ease',
                                                        }}
                                                        onMouseOver={(e) =>
                                                            (e.target.style.transform =
                                                                'translateY(-1px)')
                                                        }
                                                        onMouseOut={(e) =>
                                                            (e.target.style.transform =
                                                                'translateY(0)')
                                                        }
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoriasPage
