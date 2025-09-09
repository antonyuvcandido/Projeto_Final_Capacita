import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function CadastroPage() {
    const [form, setForm] = useState({ nome: '', email: '', senha: '' })
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSucesso('')
        try {
            await api.post('/users', form)
            setSucesso('Cadastro realizado com sucesso!')
            setTimeout(() => navigate('/login'), 1500)
        } catch (err) {
            setError('Erro ao cadastrar usuário')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                marginLeft: '220px',
                padding: '2rem',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: '#fff',
                    padding: '3rem',
                    borderRadius: '20px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '450px',
                    border: '1px solid #e8ecef',
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                    }}
                >
                    <h2
                        style={{
                            color: '#015FCA',
                            fontSize: '2rem',
                            fontWeight: '600',
                            margin: '0 0 0.5rem 0',
                        }}
                    >
                        Criar Conta
                    </h2>
                    <p
                        style={{
                            color: '#666',
                            fontSize: '1rem',
                            margin: 0,
                        }}
                    >
                        Preencha os dados para se cadastrar
                    </p>
                </div>

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
                            placeholder="Digite seu nome completo"
                            value={form.nome}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, nome: e.target.value }))
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
                            placeholder="Digite seu email"
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
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Crie uma senha segura"
                            value={form.senha}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    senha: e.target.value,
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

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: loading
                                ? '#ccc'
                                : 'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            transform: loading ? 'none' : 'translateY(0)',
                            boxShadow: loading
                                ? 'none'
                                : '0 4px 15px rgba(1, 95, 202, 0.3)',
                        }}
                        onMouseOver={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)'
                                e.target.style.boxShadow =
                                    '0 6px 20px rgba(1, 95, 202, 0.4)'
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow =
                                    '0 4px 15px rgba(1, 95, 202, 0.3)'
                            }
                        }}
                    >
                        {loading ? 'Cadastrando...' : 'Criar Conta'}
                    </button>

                    {error && (
                        <div
                            style={{
                                marginTop: '1rem',
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

                    {sucesso && (
                        <div
                            style={{
                                marginTop: '1rem',
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
                </form>
            </div>
        </div>
    )
}

export default CadastroPage
