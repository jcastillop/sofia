'use client'
import React from 'react'
import { NextPage } from 'next';
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react'
import { IProducto } from '@/interfaces';
import { useProducts } from '@/hooks';
import { MainLayout, ProductDialog } from '@/components';
import { nuevoProducto } from '@/data/initial';

const ProductPage: NextPage = () => {

  const { data: session, status } = useSession()

  const { products } = useProducts();

  if ( !products ) return (<></>);

  const rows = products.map( (product: IProducto) => ({
    id          : product.uid,
    nombre        : product.nombre,
    codigo        : product.codigo,
    codigo_sunat  : product.codigo_sunat,
    descuento    : product.descuento,
    descripcion : product.descripcion,
    precio_unitario  : product.precio_unitario,
    valor_unitario  : product.valor_unitario,
    unidad_medida: product.unidad_medida
  }));

  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'codigo', headerName: 'Código', width: 150 },
    { field: 'codigo_sunat', headerName: 'SUNAT', width: 50 },
    { field: 'descuento', headerName: 'Descuento', width: 70 },
    { field: 'descripcion', headerName: 'Descripcion', width: 400 },
    { field: 'precio_unitario', headerName: 'Precio unitario', width: 100 },
    { field: 'valor_unitario', headerName: 'Valor unitario', width: 100 },
    { field: 'unidad_medida', headerName: 'Unidad de medida', width: 100 },
    {
      field: 'accion',
      headerName: '',

      renderCell: (params: GridRenderCellParams) => {
        const dataProducto: IProducto = {
          uid: params.row.id,
          nombre: params.row.nombre,
          codigo: params.row.codigo,
          codigo_sunat: params.row.codigo_sunat,
          descuento: params.row.descuento,
          descripcion: params.row.descripcion,
          precio_unitario: params.row.precio_unitario,
          valor_unitario: params.row.valor_unitario,
          unidad_medida: params.row.unidad_medida,
          categoria: {
            nombre: "",
            descripcion: "",
            empresa: ""
          },
          aplicacion: {
              nombre: "",
              descripcion: "",
              estado: false
          },
          empresa: {
              nombre_comercial: "",
              razon_social: "",
              ruc: "",
              estado: false
          }
        }
          return <ProductDialog product={ dataProducto } newProduct={ false } />
      }, width: 150

  },      
  ]

  return (
    <MainLayout title={'Productos'} pageDescription={'Creación o edición de los productos'} imageFullUrl={''}>
      <Typography variant='h1' component = 'h1'>Productos</Typography>
      <Typography variant='h2' sx={{ mb: '10px' }}>Creación/modificación de productos</Typography>

      <ProductDialog product={ nuevoProducto } newProduct={ true } />
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

export default ProductPage