'use client'
import { NextPage } from "next";
import Link from 'next/link'
import { Typography, Grid, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { MainLayout, ProductDialog } from "@/components";
import { Constantes, getDatetimeFormat } from "@/helpers";
import { useComprobantes } from "@/hooks";
import { IBilling, IBillingState, ICliente } from "@/interfaces";

const HistoricoPage: NextPage = () => {

    const { comprobantes } = useComprobantes();

    if ( !comprobantes ) return (<></>);

    const rows = comprobantes.map( (comprobante: IBilling) => ({
        id              : comprobante._id,
        fecha           : getDatetimeFormat(comprobante.fecha_emision),
        tipo            : comprobante.tipo_comprobante,
        comprobante     : comprobante.numeracion_comprobante,
        cliente         : (comprobante.cliente as ICliente).razon_social,
        documento       : (comprobante.cliente as ICliente).numero_documento,
        gravadas        : comprobante.total_gravadas,
        igv             : comprobante.total_igv,
        total           : comprobante.total_venta,
        sunat           : (comprobante.estados as unknown as IBillingState[])[0].value,
        pdf             : comprobante.url,
        usuario         : comprobante.usuario,
        items           : comprobante.items,
        cadena_qr       : comprobante.cadena_para_codigo_qr,
        hash            : comprobante.codigo_hash,
        errores         : comprobante.errors,
        url             : comprobante.url
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 2, disableColumnMenu: true },
        { field: 'fecha',          headerName: 'Fecha', width: 150 },
        { field: 'comprobante',          headerName: 'Comprobante', width: 150 },
        { field: 'cliente',       headerName: 'Cliente', width: 150 },
        { field: 'gravadas',          headerName: 'Subtotal', width: 150 },
        { field: 'igv',    headerName: 'IGV', width: 50 },
        { field: 'total',   headerName: 'Total', width: 100 },
        { field: 'pdf', headerName: 'PDF', 
        renderCell: (params: GridRenderCellParams<any>) => { 
          return <a target="_blank" href={params.row.pdf} rel="noopener noreferrer">
          PDF
          </a>
            
        },width: 100,
      },         
        { 
            field: 'sunat',
            headerName: 'SUNAT',
            renderCell: (params: GridRenderCellParams<any>)=> {
                if(params.row.tipo == Constantes.TipoComprobante.Factura || params.row.tipo == Constantes.TipoComprobante.Boleta || params.row.tipo == Constantes.TipoComprobante.NotaCredito){
                    if(params.row.error){
                      return <Chip key={ params.row.id } variant='filled' label="Error SUNAT" color="error" component={ Link } href={`/`} clickable/>
                    // }else if(!params.row.hash){
                    //   return <Chip key={ params.row.id } variant='filled' label="Regularizar" color="warning" component={ Link } href={`/fueledit/${params.row.abastecimiento}?id=${params.row.id}&tipo=${params.row.tipo}&correlativo=${params.row.comprobante}`} clickable/>
                    }else{
                      return <Chip variant='filled' label="Correcto" color="success" />
                      //return <Chip key={ params.row.id } variant='filled' label="Correcto" color="success" component={ Link } href={`/fueledit/${params.row.abastecimiento}?id=${params.row.id}&tipo=${params.row.tipo}&correlativo=${params.row.comprobante}`} clickable/>
                    }
                    
                  }else{
                    return(<></>)
                  }                
            },
            width: 100 
        }
      ]
    

    return (
        <MainLayout title={'Productos'} pageDescription={'Creación o edición de los productos'} imageFullUrl={''}>
        <Typography variant='h1' component = 'h1'>Comprobantes</Typography>
        <Typography variant='h2' sx={{ mb: '10px' }}>Histórico de comprobantes</Typography>

        {/* <ProductDialog product={ nuevoProducto } newProduct={ true } /> */}
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

export default HistoricoPage