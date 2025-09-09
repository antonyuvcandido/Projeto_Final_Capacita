import React, { useEffect, useState } from 'react'
import api from '../services/api'

function PerfilPage() {
    const [usuario, setUsuario] = useState(null)
    const [form, setForm] = useState({ nome: '', email: '', senha: '' })
    const [editando, setEditando] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState('')

    useEffect(() => {
        async function fetchUsuario() {
            setLoading(true)
            setError('')
            try {
                const idUsuario = localStorage.getItem('idUsuario')
                if (!idUsuario) return setError('Usuário não encontrado')
                const response = await api.get(`/users/${idUsuario}`)
                setUsuario(response.data)
                setForm({
                    nome: response.data.nome,
                    email: response.data.email,
                    senha: '',
                })
            } catch {
                setError('Erro ao carregar perfil')
            } finally {
                setLoading(false)
            }
        }
        fetchUsuario()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSucesso('')
        try {
            const idUsuario = localStorage.getItem('idUsuario')
            await api.put(`/users/${idUsuario}`, form)
            setSucesso('Dados atualizados com sucesso!')
            setEditando(false)
            setTimeout(() => setSucesso(''), 1500)
        } catch {
            setError('Erro ao atualizar dados')
        } finally {
            setLoading(false)
        }
    }

    if (loading)
        return (
            <div style={{ marginLeft: '220px', padding: '2rem' }}>
                <h2>Perfil</h2>
                <p>Carregando...</p>
            </div>
        )

    if (error)
        return (
            <div style={{ marginLeft: '220px', padding: '2rem' }}>
                <h2>Perfil</h2>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        )

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
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <h2
                    style={{
                        color: '#015FCA',
                        fontSize: '2rem',
                        fontWeight: '600',
                        marginBottom: '2rem',
                        textAlign: 'center',
                    }}
                >
                    Meu Perfil
                </h2>

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

                {!editando ? (
                    <div
                        style={{
                            background: '#fff',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e8ecef',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                marginBottom: '2rem',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                }}
                            >
                                <strong
                                    style={{
                                        color: '#015FCA',
                                        minWidth: '80px',
                                        fontSize: '1rem',
                                    }}
                                >
                                    Nome:
                                </strong>
                                <span
                                    style={{
                                        color: '#374151',
                                        fontSize: '1rem',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    {usuario?.nome}
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                }}
                            >
                                <strong
                                    style={{
                                        color: '#015FCA',
                                        minWidth: '80px',
                                        fontSize: '1rem',
                                    }}
                                >
                                    Email:
                                </strong>
                                <span
                                    style={{
                                        color: '#374151',
                                        fontSize: '1rem',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    {usuario?.email}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setEditando(true)}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background:
                                    'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(1, 95, 202, 0.3)',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)'
                                e.target.style.boxShadow =
                                    '0 6px 20px rgba(1, 95, 202, 0.4)'
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow =
                                    '0 4px 15px rgba(1, 95, 202, 0.3)'
                            }}
                        >
                            Editar Perfil
                        </button>
                    </div>
                ) : (
                    <div
                        style={{
                            background: '#fff',
                            padding: '3rem',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e8ecef',
                        }}
                    >
                        <h3
                            style={{
                                color: '#015FCA',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                marginBottom: '2rem',
                                textAlign: 'center',
                            }}
                        >
                            Editar Informações
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        color: '#015FCA',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Nome Completo
                                </label>
                                <input
                                    placeholder="Nome"
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
                                        padding: '0.875rem 1rem',
                                        border: '2px solid #e8ecef',
                                        borderRadius: '10px',
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

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        color: '#015FCA',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            email: e.target.value,
                                        }))
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '2px solid #e8ecef',
                                        borderRadius: '10px',
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

                            <div style={{ marginBottom: '2rem' }}>
                                <label
                                    style={{
                                        display: 'block',
                                        color: '#015FCA',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Nova Senha (opcional)
                                </label>
                                <input
                                    type="password"
                                    placeholder="Deixe em branco para manter a senha atual"
                                    value={form.senha}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            senha: e.target.value,
                                        }))
                                    }
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        border: '2px solid #e8ecef',
                                        borderRadius: '10px',
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
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    flexDirection: 'column',
                                }}
                            >
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        background:
                                            'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '10px',
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
                                        e.target.style.transform =
                                            'translateY(0)'
                                        e.target.style.boxShadow =
                                            '0 4px 15px rgba(1, 95, 202, 0.3)'
                                    }}
                                >
                                    Salvar Alterações
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setEditando(false)}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        background: '#f3f4f6',
                                        color: '#374151',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '10px',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#e5e7eb'
                                        e.target.style.borderColor = '#d1d5db'
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = '#f3f4f6'
                                        e.target.style.borderColor = '#e5e7eb'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PerfilPage
