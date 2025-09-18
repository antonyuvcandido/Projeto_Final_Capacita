import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import api from '../services/api'

export default function MyStack({data, valor, status}) {
  
  if (data) {
    const date = new Date(data);
    data = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  if (valor) {
    valor = Number(valor);
    valor = `R$ ${valor.toFixed(2)}`;
  }

  if (status) {
    if (status === 'pending') status = 'Pendente';
    else if (status === 'completed') status = 'Concluído';
    else if (status === 'canceled') status = 'Cancelado';
    else status = 'Desconhecido';
  } else {
    status = 'Desconhecido';
  }

  return (
    <div style={{
                padding: '2% 6%',
                margin: '2% 0',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                background: '#ddddddff',
            }}>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
      >
        <span>{data}</span>
        <span>{valor}</span>
        <span>{status}</span>
        <button
                            type="button"
                            style={{
                                width: '20%',
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
                            }}
                            onMouseOver={(e) => {
                                e.target.style.boxShadow =
                                    '0 6px 20px rgba(9, 61, 230, 0.4)'
                            }}
                            onMouseOut={(e) => {
                                e.target.style.boxShadow = 'none'
                            }}
                        >
                            Ver mais
                        </button>
        
      </Stack>
    </div>
  );
}