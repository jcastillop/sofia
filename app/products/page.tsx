'use client'
import React from 'react'
import { NextPage } from 'next';
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IProduct } from '@/interfaces';
import { useProducts } from '@/hooks';
import { MainLayout, ProductDialog } from '@/components';

const ProductPage: NextPage = () => {

    const nuevoProducto: IProduct = {
        uid: '',
        name: '',
        category: 'product',
        code: '',
        sunat_code: '',
        discount: 0,
        description: '',
        unit_price: 0,
        unit_value: 0,
        unit_measure: ''
    }

  const { products, isLoadingProduct, hasErrorProduct } = useProducts({ refreshInterval: 0});

  if ( !products ) return (<></>);

  const rows = products.map( (product: IProduct) => ({
    uid          : product.uid,
    name        : product.name,
    category    : product.category,
    code        : product.code,
    sunat_code  : product.sunat_code,
    discount    : product.discount,
    description : product.description,
    unit_price  : product.unit_price,
    unit_value  : product.unit_value,
    unit_measure: product.unit_measure
  }));

  const columns: GridColDef[] = [
    { field: 'uid', headerName: 'ID', width: 2 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'category', headerName: 'Categoría', width: 100 },
    { field: 'code', headerName: 'Código', width: 150 },
    { field: 'sunat_code', headerName: 'SUNAT', width: 50 },
    { field: 'discount', headerName: 'Descuento', width: 70 },
    { field: 'description', headerName: 'Descripcion', width: 400 },
    { field: 'unit_price', headerName: 'Precio unitario', width: 100 },
    { field: 'unit_value', headerName: 'Valor unitario', width: 100 },
    { field: 'unit_measure', headerName: 'Unidad de medida', width: 100 },
    {
      field: 'accion',
      headerName: '',

      renderCell: (params: GridRenderCellParams<IProduct>) => {
        const dataProducto: IProduct = {
            uid: params.row.uid,
            name: params.row.name,
            category: params.row.category,
            code: params.row.code,
            sunat_code: params.row.sunat_code,
            discount: params.row.discount,
            description: params.row.description,
            unit_price: params.row.unit_price,
            unit_value: params.row.unit_value,
            unit_measure: params.row.unit_measure
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