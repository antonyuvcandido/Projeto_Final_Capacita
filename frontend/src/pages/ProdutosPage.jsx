import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function ProdutosPage() {
    const navigate = useNavigate()
    const [ordem, setOrdem] = useState({ campo: '', direcao: 'asc' })
    const [detalheProduto, setDetalheProduto] = useState(null)
    const [filtroCategoria, setFiltroCategoria] = useState('')
    const [busca, setBusca] = useState('')
    const [pagina, setPagina] = useState(1)
    const [sucesso, setSucesso] = useState('')
    const itensPorPagina = 5
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        nome: '',
        preco: '',
        quantidade: '',
        descricao: '',
        idCategoria: '',
        imagem: null,
    })
    const [editId, setEditId] = useState(null)
    const [editForm, setEditForm] = useState({
        nome: '',
        preco: '',
        quantidade: '',
        descricao: '',
        idCategoria: '',
        imagem: null,
    })

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories'),
                ])
                setProdutos(prodRes.data)
                setCategorias(catRes.data)
            } catch (err) {
                setError('Erro ao carregar produtos ou categorias')
            } finally {
                setLoading(false)
            }
        }
        fetchProdutos()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nome', form.nome)
            formData.append('preco', form.preco)
            formData.append('quantidade', form.quantidade)
            formData.append('descricao', form.descricao)
            formData.append('idCategoria', form.idCategoria)
            if (form.imagem) {
                formData.append('imagem', form.imagem)
            }

            await api.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setForm({
                nome: '',
                preco: '',
                quantidade: '',
                descricao: '',
                idCategoria: '',
                imagem: null,
            })
            setLoading(true)
            setSucesso('Produto cadastrado com sucesso!')
            setError('')
            const response = await api.get('/products')
            setProdutos(response.data)
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            setError('Erro ao cadastrar produto')
            setSucesso('')
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Deseja realmente excluir este produto?')) return
        try {
            await api.delete(`/products/${id}`)
            setProdutos(produtos.filter((p) => p.id !== id))
            setSucesso('Produto excluído com sucesso!')
            setError('')
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            setError('Erro ao excluir produto')
            setSucesso('')
        }
    }

    function handleEdit(produto) {
        setEditId(produto.id)
        setEditForm({
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade,
            descricao: produto.descricao,
            idCategoria: produto.idCategoria,
            imagem: null,
            imagemAtual: produto.imagem,
        })
    }

    async function handleEditSubmit(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nome', editForm.nome)
            formData.append('preco', editForm.preco)
            formData.append('quantidade', editForm.quantidade)
            formData.append('descricao', editForm.descricao)
            formData.append('idCategoria', editForm.idCategoria)
            if (editForm.imagem) {
                formData.append('imagem', editForm.imagem)
            }

            await api.put(`/products/${editId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setEditId(null)
            setLoading(true)
            setSucesso('Produto editado com sucesso!')
            setError('')
            const response = await api.get('/products')
            setProdutos(response.data)
            setTimeout(() => setSucesso(''), 2000)
        } catch (err) {
            setError('Erro ao editar produto')
            setSucesso('')
        } finally {
            setLoading(false)
        }
    }

    // Filtro, busca, ordenação e paginação
    let produtosFiltrados = produtos.filter(
        (p) =>
            (!filtroCategoria || p.idCategoria === filtroCategoria) &&
            (!busca || p.nome.toLowerCase().includes(busca.toLowerCase()))
    )

    if (ordem.campo) {
        produtosFiltrados = [...produtosFiltrados].sort((a, b) => {
            if (ordem.campo === 'nome') {
                if (ordem.direcao === 'asc') return a.nome.localeCompare(b.nome)
                else return b.nome.localeCompare(a.nome)
            }
            if (ordem.campo === 'preco') {
                if (ordem.direcao === 'asc')
                    return Number(a.preco) - Number(b.preco)
                else return Number(b.preco) - Number(a.preco)
            }
            if (ordem.campo === 'quantidade') {
                if (ordem.direcao === 'asc') return a.quantidade - b.quantidade
                else return b.quantidade - a.quantidade
            }
            return 0
        })
    }

    const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina)
    const produtosPaginados = produtosFiltrados.slice(
        (pagina - 1) * itensPorPagina,
        pagina * itensPorPagina
    )

    function handleOrdem(campo) {
        setOrdem((o) => ({
            campo,
            direcao:
                o.campo === campo
                    ? o.direcao === 'asc'
                        ? 'desc'
                        : 'asc'
                    : 'asc',
        }))
    }

    function exportarCSV() {
        const cabecalho = [
            'Nome',
            'Descrição',
            'Preço',
            'Quantidade',
            'Categoria',
        ]
        const linhas = produtosFiltrados.map((p) => [
            p.nome,
            p.descricao,
            p.preco,
            p.quantidade,
            p.categoria?.nome || 'Sem categoria',
        ])
        let csv = cabecalho.join(';') + '\n'
        csv += linhas.map((l) => l.join(';')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'produtos.csv'
        a.click()
        URL.revokeObjectURL(url)
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
            <h2
                style={{
                    color: '#015FCA',
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                Gerenciar Produtos
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
                    Cadastrar Novo Produto
                </h3>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(250px, 1fr))',
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
                            Nome do Produto
                        </label>
                        <input
                            placeholder="Digite o nome do produto"
                            value={form.nome}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, nome: e.target.value }))
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e8ecef',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
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
                            Preço (R$)
                        </label>
                        <input
                            placeholder="0,00"
                            type="number"
                            step="0.01"
                            value={form.preco}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    preco: e.target.value,
                                }))
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e8ecef',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
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
                            Quantidade
                        </label>
                        <input
                            placeholder="0"
                            type="number"
                            value={form.quantidade}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    quantidade: e.target.value,
                                }))
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e8ecef',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
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
                            Categoria
                        </label>
                        <select
                            value={form.idCategoria}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    idCategoria: e.target.value,
                                }))
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e8ecef',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                boxSizing: 'border-box',
                                background: '#fff',
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = '#015FCA')
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = '#e8ecef')
                            }
                        >
                            <option value="">Selecione a categoria</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
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
                            Imagem do Produto
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    imagem: e.target.files[0],
                                }))
                            }
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e8ecef',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                boxSizing: 'border-box',
                                background: '#fff',
                                cursor: 'pointer',
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = '#015FCA')
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = '#e8ecef')
                            }
                        />
                        <small style={{ color: '#666', fontSize: '0.8rem' }}>
                            Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                        </small>
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
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
                            placeholder="Descrição detalhada do produto"
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
                                fontSize: '0.9rem',
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

                    <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background:
                                    'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
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
                            Cadastrar Produto
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Filtro por categoria:{' '}
                    <select
                        value={filtroCategoria}
                        onChange={(e) => {
                            setFiltroCategoria(e.target.value)
                            setPagina(1)
                        }}
                    >
                        <option value="">Todas</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nome}
                            </option>
                        ))}
                    </select>
                </label>{' '}
                |{' '}
                <label>
                    Buscar:{' '}
                    <input
                        value={busca}
                        onChange={(e) => {
                            setBusca(e.target.value)
                            setPagina(1)
                        }}
                        placeholder="Nome do produto"
                    />
                </label>
            </div>

            <div
                style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                }}
            >
                <button
                    onClick={() => navigate('/categorias')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background:
                            'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow =
                            '0 6px 20px rgba(16, 185, 129, 0.4)'
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow =
                            '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }}
                >
                    Cadastrar Categoria
                </button>

                <button
                    onClick={exportarCSV}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background:
                            'linear-gradient(135deg, #015FCA 0%, #0146a3 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
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
                    Exportar CSV
                </button>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginLeft: 'auto',
                    }}
                >
                    <span
                        style={{
                            color: '#015FCA',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                        }}
                    >
                        Ordenar por:
                    </span>
                    <button onClick={() => handleOrdem('nome')}>
                        Nome{' '}
                        {ordem.campo === 'nome'
                            ? ordem.direcao === 'asc'
                                ? '↑'
                                : '↓'
                            : ''}
                    </button>
                    <button onClick={() => handleOrdem('preco')}>
                        Preço{' '}
                        {ordem.campo === 'preco'
                            ? ordem.direcao === 'asc'
                                ? '↑'
                                : '↓'
                            : ''}
                    </button>
                    <button onClick={() => handleOrdem('quantidade')}>
                        Quantidade{' '}
                        {ordem.campo === 'quantidade'
                            ? ordem.direcao === 'asc'
                                ? '↑'
                                : '↓'
                            : ''}
                    </button>
                </div>
            </div>

            <ul style={{ padding: 0, listStyle: 'none' }}>
                {produtosPaginados.map((produto) => (
                    <li
                        key={produto.id}
                        style={{
                            border: '1px solid #ccc',
                            margin: '1rem 0',
                            padding: '1rem',
                            borderRadius: '8px',
                        }}
                    >
                        {editId === produto.id ? (
                            <div
                                style={{
                                    background: '#f8fafc',
                                    padding: '1.5rem',
                                    borderRadius: '10px',
                                    border: '2px solid #015FCA',
                                }}
                            >
                                <h4
                                    style={{
                                        color: '#015FCA',
                                        marginBottom: '1rem',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Editando: {produto.nome}
                                </h4>

                                <form
                                    onSubmit={handleEditSubmit}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            'repeat(auto-fit, minmax(200px, 1fr))',
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
                                                    nome: e.target.value,
                                                }))
                                            }
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #e8ecef',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#015FCA')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#e8ecef')
                                            }
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
                                            Preço
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editForm.preco}
                                            onChange={(e) =>
                                                setEditForm((f) => ({
                                                    ...f,
                                                    preco: e.target.value,
                                                }))
                                            }
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #e8ecef',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#015FCA')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#e8ecef')
                                            }
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
                                            Quantidade
                                        </label>
                                        <input
                                            type="number"
                                            value={editForm.quantidade}
                                            onChange={(e) =>
                                                setEditForm((f) => ({
                                                    ...f,
                                                    quantidade: e.target.value,
                                                }))
                                            }
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #e8ecef',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#015FCA')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#e8ecef')
                                            }
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
                                            Categoria
                                        </label>
                                        <select
                                            value={editForm.idCategoria}
                                            onChange={(e) =>
                                                setEditForm((f) => ({
                                                    ...f,
                                                    idCategoria: e.target.value,
                                                }))
                                            }
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #e8ecef',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                background: '#fff',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#015FCA')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#e8ecef')
                                            }
                                        >
                                            <option value="">
                                                Selecione a categoria
                                            </option>
                                            {categorias.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.nome}
                                                </option>
                                            ))}
                                        </select>
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
                                            Nova Imagem
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setEditForm((f) => ({
                                                    ...f,
                                                    imagem: e.target.files[0],
                                                }))
                                            }
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #e8ecef',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                background: '#fff',
                                                cursor: 'pointer',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#015FCA')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#e8ecef')
                                            }
                                        />
                                        {editForm.imagemAtual && (
                                            <div
                                                style={{ marginTop: '0.5rem' }}
                                            >
                                                <small
                                                    style={{
                                                        color: '#666',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    Imagem atual:
                                                </small>
                                                <img
                                                    src={`http://localhost:3001${editForm.imagemAtual}`}
                                                    alt="Imagem atual"
                                                    style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px',
                                                        marginLeft: '8px',
                                                        border: '1px solid #e8ecef',
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <small
                                            style={{
                                                color: '#666',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            Deixe em branco para manter a imagem
                                            atual
                                        </small>
                                    </div>

                                    <div style={{ gridColumn: '1 / -1' }}>
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
                                                    descricao: e.target.value,
                                                }))
                                            }
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #e8ecef',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor =
                                                    '#015FCA')
                                            }
                                            onBlur={(e) =>
                                                (e.target.style.borderColor =
                                                    '#e8ecef')
                                            }
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
                                                flex: 1,
                                                padding: '0.6rem',
                                                background:
                                                    'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
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
                                            onClick={() => setEditId(null)}
                                            style={{
                                                flex: 1,
                                                padding: '0.6rem',
                                                background: '#f3f4f6',
                                                color: '#374151',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
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
                            </div>
                        ) : (
                            <>
                                <h3
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                    onClick={() => setDetalheProduto(produto)}
                                >
                                    {produto.nome}
                                </h3>
                                <p>{produto.descricao}</p>
                                <p>
                                    <strong>Preço:</strong> R$ {produto.preco}
                                </p>
                                <p>
                                    <strong>Quantidade:</strong>{' '}
                                    {produto.quantidade}
                                </p>
                                <p>
                                    <strong>Categoria:</strong>{' '}
                                    {produto.categoria?.nome || 'Sem categoria'}
                                </p>
                                <button onClick={() => handleEdit(produto)}>
                                    Editar
                                </button>{' '}
                                <button
                                    onClick={() => handleDelete(produto.id)}
                                    style={{ color: 'red' }}
                                >
                                    Excluir
                                </button>
                                <button
                                    onClick={() => setDetalheProduto(produto)}
                                >
                                    Detalhes
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {detalheProduto && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={() => setDetalheProduto(null)}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '12px',
                            minWidth: '300px',
                            maxWidth: '90vw',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Detalhes do Produto</h2>
                        <p>
                            <strong>Nome:</strong> {detalheProduto.nome}
                        </p>
                        <p>
                            <strong>Descrição:</strong>{' '}
                            {detalheProduto.descricao}
                        </p>
                        <p>
                            <strong>Preço:</strong> R$ {detalheProduto.preco}
                        </p>
                        <p>
                            <strong>Quantidade:</strong>{' '}
                            {detalheProduto.quantidade}
                        </p>
                        <p>
                            <strong>Categoria:</strong>{' '}
                            {detalheProduto.categoria?.nome || 'Sem categoria'}
                        </p>
                        <button onClick={() => setDetalheProduto(null)}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {totalPaginas > 1 && (
                <div style={{ marginTop: '1rem' }}>
                    <button
                        onClick={() => setPagina((p) => Math.max(1, p - 1))}
                        disabled={pagina === 1}
                    >
                        Anterior
                    </button>
                    <span style={{ margin: '0 1rem' }}>
                        Página {pagina} de {totalPaginas}
                    </span>
                    <button
                        onClick={() =>
                            setPagina((p) => Math.min(totalPaginas, p + 1))
                        }
                        disabled={pagina === totalPaginas}
                    >
                        Próxima
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProdutosPage
