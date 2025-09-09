import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <aside
            style={{
                background: '#fff',
                padding: '1.5rem 1rem',
                width: '200px',
                position: 'fixed',
                left: 0,
                top: '64px',
                height: 'calc(100vh - 64px)',
                boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
            }}
        >
            <nav>
                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <li>
                        <Link
                            to="/"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                display: 'block',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/produtos"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                display: 'block',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
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
                                display: 'block',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            Estoque
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/carrinho"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                display: 'block',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            Carrinho
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/transacao"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                display: 'block',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            Transação
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/historico"
                            style={{
                                color: '#015FCA',
                                textDecoration: 'none',
                                display: 'block',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            Histórico
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
