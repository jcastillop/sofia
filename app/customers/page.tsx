'use client'
import React, { useEffect } from 'react'
import { NextPage } from 'next';
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react'
import { ICategoria, ICliente } from '@/interfaces';
import { useClientes } from '@/hooks';
import { CustomerDialog, CustomerNewDialog, MainLayout, ProductDialog } from '@/components';
import { nuevoProducto } from '@/data/initial';

const CustomerPage: NextPage = () => {

  const { data: session, status } = useSession()

  const { clientes } = useClientes();

  if ( !clientes ) return (<></>);

  const rows = clientes.map( (cliente: ICliente) => ({
    id               : cliente._id,
    tipo_documento   : cliente.tipo_documento,
    numero_documento : cliente.numero_documento,
    nombre_comercial : cliente.nombre_comercial,
    razon_social     : cliente.razon_social,
    ubigeo           : cliente.ubigeo,
    direccion        : cliente.direccion,
    correo           : cliente.correo
  }));

  const columns: GridColDef[] = [
    { field: 'numero_documento',          headerName: 'Documento', width: 150 },
    { field: 'razon_social',          headerName: 'Razon social', width: 400 },
    { field: 'ubigeo',    headerName: 'Ubigeo', width: 100 },
    { field: 'direccion',    headerName: 'Direccion', width: 200 },
    { field: 'correo',   headerName: 'Correo', width: 350 },
    {
      field: 'accion',
      headerName: '',
      renderCell: (params: GridRenderCellParams) => {
          const client: ICliente = {
            _id: params.row.id,
            tipo_documento: params.row.tipo_documento,
            numero_documento: params.row.numero_documento,
            razon_social: params.row.razon_social,
            nombre_comercial: params.row.nombre_comercial,
            ubigeo: params.row.ubigeo,
            direccion: params.row.direccion,
            correo: params.row.correo,
          }
          return <CustomerDialog cliente={ client } newClient={ false }/>
      }, width: 150

  },      
  ]

  return (
    <MainLayout title={'Productos'} pageDescription={'Creación o edición de los productos'} imageFullUrl={''}>
      <Typography variant='h1' component = 'h1'>Clientes</Typography>
      <Typography variant='h2' sx={{ mb: '10px' }}>Creación/modificación de clientes</Typography>

      <CustomerNewDialog newProduct={ true } />
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height:700, width: '100%', mt:2}}>
            <DataGrid 
                rows={ rows }
                columns={ columns }
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 }},
                    columns: {
                    columnVisibilityModel: {
                        // hash: false,
                        // documento: false,
                    }
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </Grid>
      </Grid>

    </MainLayout>
  )
}

export default CustomerPage