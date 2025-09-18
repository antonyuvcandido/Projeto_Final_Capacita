import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
  const containerStyle = {
    width: '100%',
    maxWidth: '100%',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    boxSizing: 'border-box'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    flex: '3',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const selectStyle = {
    flex: '1',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    minWidth: '200px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  // Estilos para hover e focus
  const interactionStyles = {
    '&:hover': {
      borderColor: '#3b82f6',
      backgroundColor: '#fff'
    },
    '&:focus': {
      borderColor: '#3b82f6',
      backgroundColor: '#fff',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)'
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            ...inputStyle,
            '&:hover': interactionStyles['&:hover'],
            '&:focus': interactionStyles['&:focus']
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          style={{
            ...selectStyle,
            '&:hover': interactionStyles['&:hover'],
            '&:focus': interactionStyles['&:focus']
          }}
        >
          <option value="">Ordenar por</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="price-asc">Preço (Menor-Maior)</option>
          <option value="price-desc">Preço (Maior-Menor)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;