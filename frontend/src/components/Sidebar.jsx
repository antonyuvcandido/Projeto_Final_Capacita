import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside style={{background:'#eee',padding:'1rem',width:'200px',float:'left',height:'100vh'}}>
      <nav>
        <ul style={{listStyle:'none',padding:0}}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/cadastro">Cadastro</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/estoque">Estoque</Link></li>
          <li><Link to="/carrinho">Carrinho</Link></li>
          <li><Link to="/transacao">Transação</Link></li>
          <li><Link to="/historico">Histórico</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
