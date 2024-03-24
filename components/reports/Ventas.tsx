'use client'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, Chip, Collapse, FormControlLabel, FormGroup, Grid, IconButton, Link, MenuItem, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { reporteVentas, useUsuarios } from '@/hooks';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Constantes, getDatetimeFormat } from '@/helpers';
import { IBilling, ICliente } from '@/interfaces';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


type FormData = {
    fechaInicio: Date;
    fechaFin: Date|null;
    usuario: string;
    ruc: string;
    tipo_comprobante: string[];
}

const tipoComprobanteList = [
    {value: Constantes.TipoComprobante.Boleta, label:"Boletas"},
    {value: Constantes.TipoComprobante.Factura, label:"Facturas"},
    {value: Constantes.TipoComprobante.NotaCredito, label:"Notas credito"},
    {value: Constantes.TipoComprobante.Interno, label:"Comprobantes internos"}
]

export const Ventas = () => {

    const { control, register, reset, handleSubmit, trigger, setValue, getValues, formState: { errors } }  = useForm<FormData>({
        defaultValues: {
            fechaInicio: new Date(), fechaFin: new Date(), usuario: '0', tipo_comprobante:[], ruc:''
        }
    });

    const { usuarios, isLoading, error } = useUsuarios()
    const [ openCollapse, setOpenCollapse ] = useState(false); 
    const [ billings, setBillings ] = useState<IBilling[]>([]); 
    const [showPrint, setShowPrint] = useState(false);
    const [dataDownloader, setDataDownloader] = useState<any>();

    const onSubmitReporte = async ({ fechaInicio, fechaFin, usuario, ruc, tipo_comprobante}: FormData) => {

        const { hasError, message, comprobantes} = await reporteVentas( fechaInicio, fechaFin, usuario, ruc, tipo_comprobante.toString() );
        
        if(!hasError && comprobantes.length > 0 ){
            setOpenCollapse(false)
            setBillings(comprobantes)
            // const reporte = { paramFechaInicio: data }
            // setDataDownloader(reporte)
            // setShowPrint(true)
        }else{
            setBillings([])
        }
    }

    const rows = billings.map( (comprobante: IBilling) => ({
        id              : comprobante._id,
        fecha           : getDatetimeFormat(comprobante.fecha_emision),
        tipo            : comprobante.tipo_comprobante,
        comprobante     : comprobante.numeracion_comprobante,
        cliente         : comprobante.cliente?((comprobante.cliente as ICliente).razon_social):'',
        documento       : comprobante.cliente?((comprobante.cliente as ICliente).numero_documento):'',
        gravadas        : comprobante.total_gravadas,
        igv             : comprobante.total_igv,
        total           : comprobante.total_venta,
        //sunat           : (comprobante.estados as unknown as IBillingState[])[0].value,
        pdf             : comprobante.url,
        usuario         : comprobante.usuario,
        items           : comprobante.items,
        cadena_qr       : comprobante.cadena_para_codigo_qr,
        hash            : comprobante.codigo_hash,
        errores         : comprobante.errors,
        orden           : comprobante.orden
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
          if(params.row.pdf){
            return <a target="_blank" href={params.row.pdf} rel="noopener noreferrer">
            PDF
            </a>
          }else{
            return(<></>)
          }  
        },width: 100,
      },         
      { 
          field: 'sunat',
          headerName: 'SUNAT',
          renderCell: (params: GridRenderCellParams<any>)=> {
              if(params.row.tipo == Constantes.TipoComprobante.Factura || params.row.tipo == Constantes.TipoComprobante.Boleta || params.row.tipo == Constantes.TipoComprobante.NotaCredito){
                  if(params.row.errores){
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
      },
      { 
        field: 'orden',
        headerName: 'Detalle',
        renderCell: (params: GridRenderCellParams<any>)=> {
          return <Chip key={ params.row.id } variant='filled' label="Ver detalle" color="secondary" component={ Link } href={`/order/${params.row.orden}/${false}`} clickable/>
        },
        width: 100 
    }      
    ]    

    return (
        <>
            <form onSubmit={ handleSubmit( onSubmitReporte ) }>
                <Grid container  spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Card className='card-diario'>
                            <CardHeader
                                title="Detalle de ventas"
                                subheader="Complete los campos obtener el reporte, la fecha de inicio, fin y el tipo de comprobante es obligatorio"
                                action={ 
                                    <IconButton 
                                        onClick={() => setOpenCollapse(!openCollapse)} 
                                        aria-label="expand"
                                        size="small"
                                    > 
                                        {openCollapse ? <ArrowUpward /> 
                                            : <ArrowDownward />} 
                                    </IconButton> 
                                }                                
                            />
                            <Collapse in={openCollapse}>
                                <CardContent> 
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={6}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} sm={6}>
                                                    <Controller
                                                        name="fechaInicio"
                                                        control={ control }
                                                        rules={{
                                                            required: true,
                                                        }}                                                    
                                                        render={
                                                            ({ field }) =>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker 
                                                                    label="Fecha de inicio"
                                                                    onChange={(date) => field.onChange(date)}                                                    
                                                                />
                                                            </LocalizationProvider>
                                                            }
                                                    /> 
                                                </Grid>    
                                                <Grid item xs={6} sm={6}>
                                                    <Controller
                                                        name="fechaFin"
                                                        control={ control }
                                                        render={
                                                            ({ field }) =>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker 
                                                                    label="Fecha fin"
                                                                    onChange={(date) => field.onChange(date)}                                                    
                                                                />
                                                            </LocalizationProvider>
                                                            }
                                                    /> 
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    {
                                                        isLoading
                                                        ?<></>
                                                        :
                                                        <TextField 
                                                            select
                                                                label={'Usuario'}
                                                                variant='outlined' 
                                                                fullWidth
                                                                { ...register('usuario')}
                                                                InputLabelProps={{ shrink: true }}
                                                                error={ !!errors.usuario }
                                                                helperText={ errors.usuario?.message }
                                                                sx={{ mt:2 }}
                                                                defaultValue={'0'}
                                                            >
                                                                <MenuItem value={'0'}>Seleccione</MenuItem>
                                                                {
                                                                    usuarios && usuarios.map((option, index) => (
                                                                        <MenuItem key={index} value={option._id}>
                                                                        {option.usuario}
                                                                        </MenuItem>
                                                                    ))
                                                                }

                                                        </TextField>                                        
                                                    }
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    <TextField 
                                                        label={'Ruc del cliente'}
                                                        variant='outlined' 
                                                        fullWidth
                                                        { ...register('ruc')}
                                                        InputLabelProps={{ shrink: true }}
                                                        error={ !!errors.ruc }
                                                        helperText={ errors.ruc?.message }
                                                        sx={{ mt:2 }}
                                                    />  
                                                </Grid>
                                            </Grid>        
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <Typography variant='h5' component='h5'>Seleccione el tipo de comprobante</Typography>
                                            <FormGroup>
                                                {
                                                    tipoComprobanteList.map( tipo =>(
                                                        <Grid item xs={12} key={ tipo.value }>
                                                            <FormControlLabel
                                                                value={tipo.value}
                                                                control={<Checkbox />}
                                                                label={tipo.label}
                                                                { ...register('tipo_comprobante', {
                                                                    required: 'Este campo es requerido'
                                                                    
                                                                })}
                                                            />
                                                    </Grid>                                                
                                                    ))
                                                }
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ mt: 3}}>
                                        <Grid container spacing={2} sx={{ mt: 1}}>
                                            <Grid item xs={6} sm={6}>
                                                <Button
                                                color='secondary'
                                                className='circular-btn'
                                                fullWidth
                                                type='submit'
                                                >                           
                                                    Generar Reporte
                                                </Button>                            
                                            </Grid> 
                                            {/* <Grid item xs={6} sm={6}>
                                                {
                                                    showPrint ? <ExcelDownloder
                                                    filename={`REPORTE_DIARIO_COMPROBANTES`}
                                                    data={ dataDownloader }
                                                    type={ Type.Button }
                                                    >                           
                                                        Descargar
                                                    </ExcelDownloder> : <></>
                                                }
                                            </Grid>                            */}
                                        </Grid>                  
                                    </Box>                                    
                                </CardContent>
                            </Collapse>
                        </Card>                                                           
                    </Grid>
                </Grid>              
            </form>
            {
                billings.length>0
                ?
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
                :<></>
            }
           
        </>
    )
}
