import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export default function MyStack() {
  return (
    <div style={{
                padding: '2% 7%',
                background: '#ddddddff',
            }}>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
      >
        <p>Data</p>
        <p>Valor</p>
        <p>Produtos</p>
        <p>Status</p>
        <button
                            type="submit"
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