import React, { useEffect, useState } from 'react';
import api from '../services/api';

function ProdutosPage() {
  const [ordem, setOrdem] = useState({ campo: '', direcao: 'asc' });
  const [detalheProduto, setDetalheProduto] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [sucesso, setSucesso] = useState('');
  const itensPorPagina = 5;
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nome: '', preco: '', quantidade: '', descricao: '', idCategoria: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nome: '', preco: '', quantidade: '', descricao: '', idCategoria: '' });

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProdutos(prodRes.data);
        setCategorias(catRes.data);
      } catch (err) {
        setError('Erro ao carregar produtos ou categorias');
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/products', form);
      setForm({ nome: '', preco: '', quantidade: '', descricao: '', idCategoria: '' });
      setLoading(true);
      setSucesso('Produto cadastrado com sucesso!');
      setError('');
      const response = await api.get('/produtos');
      setProdutos(response.data);
      setTimeout(() => setSucesso(''), 2000);
    } catch (err) {
      setError('Erro ao cadastrar produto');
      setSucesso('');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Deseja realmente excluir este produto?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProdutos(produtos.filter(p => p.id !== id));
      setSucesso('Produto excluído com sucesso!');
      setError('');
      setTimeout(() => setSucesso(''), 2000);
    } catch (err) {
      setError('Erro ao excluir produto');
      setSucesso('');
    }
  }

  function handleEdit(produto) {
    setEditId(produto.id);
    setEditForm({
      nome: produto.nome,
      preco: produto.preco,
      quantidade: produto.quantidade,
      descricao: produto.descricao,
      idCategoria: produto.idCategoria
    });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/products/${editId}`, editForm);
      setEditId(null);
      setLoading(true);
      setSucesso('Produto editado com sucesso!');
      setError('');
      const response = await api.get('/produtos');
      setProdutos(response.data);
      setTimeout(() => setSucesso(''), 2000);
    } catch (err) {
      setError('Erro ao editar produto');
      setSucesso('');
    } finally {
      setLoading(false);
    }
  }

  // Filtro, busca, ordenação e paginação
  let produtosFiltrados = produtos
    .filter(p =>
      (!filtroCategoria || p.idCategoria === filtroCategoria) &&
      (!busca || p.nome.toLowerCase().includes(busca.toLowerCase()))
    );

  if (ordem.campo) {
    produtosFiltrados = [...produtosFiltrados].sort((a, b) => {
      if (ordem.campo === 'nome') {
        if (ordem.direcao === 'asc') return a.nome.localeCompare(b.nome);
        else return b.nome.localeCompare(a.nome);
      }
      if (ordem.campo === 'preco') {
        if (ordem.direcao === 'asc') return Number(a.preco) - Number(b.preco);
        else return Number(b.preco) - Number(a.preco);
      }
      if (ordem.campo === 'quantidade') {
        if (ordem.direcao === 'asc') return a.quantidade - b.quantidade;
        else return b.quantidade - a.quantidade;
      }
      return 0;
    });
  }

  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const produtosPaginados = produtosFiltrados.slice((pagina-1)*itensPorPagina, pagina*itensPorPagina);

  function handleOrdem(campo) {
    setOrdem(o => ({
      campo,
      direcao: o.campo === campo ? (o.direcao === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  }

  function exportarCSV() {
    const cabecalho = ['Nome', 'Descrição', 'Preço', 'Quantidade', 'Categoria'];
    const linhas = produtosFiltrados.map(p => [
      p.nome,
      p.descricao,
      p.preco,
      p.quantidade,
      p.categoria?.nome || 'Sem categoria'
    ]);
    let csv = cabecalho.join(';') + '\n';
    csv += linhas.map(l => l.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'produtos.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{marginLeft:'220px',padding:'2rem'}}>
      <h2>Produtos</h2>
      {sucesso && <p style={{color:'green'}}>{sucesso}</p>}
      {loading && <p>Carregando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}

      <form onSubmit={handleSubmit} style={{marginBottom:'2rem',background:'#f9f9f9',padding:'1rem',borderRadius:'8px'}}>
        <h3>Cadastrar Produto</h3>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm(f => ({...f, nome: e.target.value}))} required />{' '}
        <input placeholder="Preço" type="number" value={form.preco} onChange={e => setForm(f => ({...f, preco: e.target.value}))} required />{' '}
        <input placeholder="Quantidade" type="number" value={form.quantidade} onChange={e => setForm(f => ({...f, quantidade: e.target.value}))} required />{' '}
        <input placeholder="Descrição" value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))} required />{' '}
        <select value={form.idCategoria} onChange={e => setForm(f => ({...f, idCategoria: e.target.value}))} required>
          <option value="">Selecione a categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>{' '}
        <button type="submit">Cadastrar</button>
      </form>

      <div style={{marginBottom:'1rem'}}>
        <label>
          Filtro por categoria:{' '}
          <select value={filtroCategoria} onChange={e => {setFiltroCategoria(e.target.value);setPagina(1);}}>
            <option value="">Todas</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </label>
        {' '}|{' '}
        <label>
          Buscar:{' '}
          <input value={busca} onChange={e => {setBusca(e.target.value);setPagina(1);}} placeholder="Nome do produto" />
        </label>
      </div>

      <div style={{marginBottom:'1rem'}}>
        <button onClick={exportarCSV}>Exportar CSV</button>
        {' '}|{' '}
        <span>Ordenar por: </span>
        <button onClick={() => handleOrdem('nome')}>Nome {ordem.campo==='nome' ? (ordem.direcao==='asc'?'↑':'↓') : ''}</button>
        <button onClick={() => handleOrdem('preco')}>Preço {ordem.campo==='preco' ? (ordem.direcao==='asc'?'↑':'↓') : ''}</button>
        <button onClick={() => handleOrdem('quantidade')}>Quantidade {ordem.campo==='quantidade' ? (ordem.direcao==='asc'?'↑':'↓') : ''}</button>
      </div>

      <ul style={{padding:0,listStyle:'none'}}>
        {produtosPaginados.map(produto => (
          <li key={produto.id} style={{border:'1px solid #ccc',margin:'1rem 0',padding:'1rem',borderRadius:'8px'}}>
            {editId === produto.id ? (
              <form onSubmit={handleEditSubmit} style={{marginBottom:'1rem'}}>
                <input value={editForm.nome} onChange={e => setEditForm(f => ({...f, nome: e.target.value}))} required />{' '}
                <input type="number" value={editForm.preco} onChange={e => setEditForm(f => ({...f, preco: e.target.value}))} required />{' '}
                <input type="number" value={editForm.quantidade} onChange={e => setEditForm(f => ({...f, quantidade: e.target.value}))} required />{' '}
                <input value={editForm.descricao} onChange={e => setEditForm(f => ({...f, descricao: e.target.value}))} required />{' '}
                <select value={editForm.idCategoria} onChange={e => setEditForm(f => ({...f, idCategoria: e.target.value}))} required>
                  <option value="">Selecione a categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>{' '}
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <h3 style={{cursor:'pointer',textDecoration:'underline'}} onClick={() => setDetalheProduto(produto)}>{produto.nome}</h3>
                <p>{produto.descricao}</p>
                <p><strong>Preço:</strong> R$ {produto.preco}</p>
                <p><strong>Quantidade:</strong> {produto.quantidade}</p>
                <p><strong>Categoria:</strong> {produto.categoria?.nome || 'Sem categoria'}</p>
                <button onClick={() => handleEdit(produto)}>Editar</button>{' '}
                <button onClick={() => handleDelete(produto.id)} style={{color:'red'}}>Excluir</button>
                <button onClick={() => setDetalheProduto(produto)}>Detalhes</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {detalheProduto && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={() => setDetalheProduto(null)}>
          <div style={{background:'#fff',padding:'2rem',borderRadius:'12px',minWidth:'300px',maxWidth:'90vw'}} onClick={e => e.stopPropagation()}>
            <h2>Detalhes do Produto</h2>
            <p><strong>Nome:</strong> {detalheProduto.nome}</p>
            <p><strong>Descrição:</strong> {detalheProduto.descricao}</p>
            <p><strong>Preço:</strong> R$ {detalheProduto.preco}</p>
            <p><strong>Quantidade:</strong> {detalheProduto.quantidade}</p>
            <p><strong>Categoria:</strong> {detalheProduto.categoria?.nome || 'Sem categoria'}</p>
            <button onClick={() => setDetalheProduto(null)}>Fechar</button>
          </div>
        </div>
      )}

      {totalPaginas > 1 && (
        <div style={{marginTop:'1rem'}}>
          <button onClick={() => setPagina(p => Math.max(1, p-1))} disabled={pagina === 1}>Anterior</button>
          <span style={{margin:'0 1rem'}}>Página {pagina} de {totalPaginas}</span>
          <button onClick={() => setPagina(p => Math.min(totalPaginas, p+1))} disabled={pagina === totalPaginas}>Próxima</button>
        </div>
      )}
    </div>
  );
}

export default ProdutosPage;
