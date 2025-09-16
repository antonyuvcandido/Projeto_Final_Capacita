import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MyStack from './MyStack';

/*
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}*/

export default function DataGrid() {

    return (
        <div style={{
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 25px',
                minHeight: '100vh',
                background: '#ffffffff',
            }}>
        <div style={{
                padding: '2% 10%',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 25px',
                margin: ' -2rem ',
                marginBottom: '1rem',
                background: '#ddddddff',
            }}>
                <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={3}
            >
                <h3>Data</h3>
                <h3>Valor</h3>
                <h3>Produtos</h3>
                <h3>Status</h3>
                <h3 style={{ paddingInline: '6%'  }}>Detalhes</h3>

                </Stack>
        </div>
                
        <MyStack />
        </div>
    );
}