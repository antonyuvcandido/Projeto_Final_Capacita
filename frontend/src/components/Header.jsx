import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)

        // Escutar mudanças no localStorage
        const handleStorageChange = () => {
            const token = localStorage.getItem('token')
            setIsLoggedIn(!!token)
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('idUsuario')
        setIsLoggedIn(false)
        navigate('/')
    }

    return (
        <header
            style={{
                background: '#ECECED',
                color: '#015FCA',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Link
                to="/"
                style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#015FCA',
                    textDecoration: 'none',
                    fontSize: '1.25rem',
                }}
            >
                Loja de Produtos
            </Link>
            <nav>
                <ul
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <li>
                        <Link
                            to="/produtos"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                fontWeight: 500,
                            }}
                        >
                            Produtos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/estoque"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                fontWeight: 500,
                            }}
                        >
                            Estoque
                        </Link>
                    </li>
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    style={{
                                        color: '#015FCA',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cadastro"
                                    style={{
                                        color: '#015FCA',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Cadastro
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/perfil"
                                    style={{
                                        color: '#015FCA',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Perfil
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        color: '#015FCA',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: 'inherit',
                                    }}
                                >
                                    Sair
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
