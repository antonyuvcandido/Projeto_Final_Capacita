import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import ProdutosPage from './pages/ProdutosPage'
import ProdutoDetalhePage from './pages/ProdutoDetalhePage'
import CategoriasPage from './pages/CategoriasPage'
import RequireAuth from './components/RequireAuth'
import EstoquePage from './pages/EstoquePage'
import CarrinhoPage from './pages/CarrinhoPage'
import TransacaoPage from './pages/TransacaoPage'
import HistoricoPage from './pages/HistoricoPage'
import PerfilPage from './pages/PerfilPage'

function App() {
    return (
        <Router>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/produtos/:id" element={<ProdutoDetalhePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                <Route
                    path="/produtos"
                    element={
                        <RequireAuth>
                            <ProdutosPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/categorias"
                    element={
                        <RequireAuth>
                            <CategoriasPage />
                        </RequireAuth>
                    }
                />
                <Route path="/estoque" element={<EstoquePage />} />
                <Route path="/carrinho" element={<CarrinhoPage />} />
                <Route path="/transacao/:id" element={<TransacaoPage />} />
                <Route path="/historico" element={<HistoricoPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
            </Routes>
        </Router>
    )
}

export default App
