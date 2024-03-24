import React, { useContext, useState } from 'react'

import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { getDateFormat, getDatetimeFormat } from '@/helpers';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useReporteCierreTurnos } from '@/hooks';
import { IUser } from '@/interfaces';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs, { Dayjs } from 'dayjs';

export const CierreTurnos = () => {

    const [fechaInicio, setFechaInicio] = useState<Dayjs>(dayjs());
    const [fechaFin, setFechaFin] = useState<Dayjs>(dayjs());

    const { cierres, hasError, isLoading } = useReporteCierreTurnos(fechaInicio.format('YYYY-MM-DD') , fechaFin.format('YYYY-MM-DD'));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', width: 100, disableColumnMenu: true },
        { field: 'usuario', headerName: 'Usuario', width: 250 },
        { field: 'fecha', headerName: 'Fecha', width: 150, sortable: false },
        { field: 'tarjeta', headerName: 'Tarjeta', width: 100, sortable: false },
        { field: 'efectivo', headerName: 'Efectivo', width: 100, sortable: false },
        { field: 'yape', headerName: 'Yape', width: 100, sortable: false },
        { field: 'total', headerName: 'Total', width: 100, sortable: false }
    ]

    if ( !cierres ) return (<></>);

    const rows = cierres.map( (cierre) => ({
        id          : cierre._id,
        usuario     : (cierre.usuario as IUser).nombre,
        fecha       : getDatetimeFormat(cierre.fecha),
        tarjeta     : cierre.tarjeta,
        efectivo    : cierre.efectivo,
        yape        : cierre.yape,
        total       : cierre.total
    }))

    return (
        <>
     
            <Card className='card-diario'>
                <CardHeader
                    title="Cierre de turnos"
                    subheader="Complete los campos obtener el reporte, la fecha de inicio, fin y el tipo de comprobante es obligatorio"
                />
                <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha inicio"
                        value={fechaInicio}
                        format="DD-MM-YYYY"
                        onChange={(newValue) => setFechaInicio(newValue?newValue:dayjs())}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha fin"
                        value={fechaFin}
                        format="DD-MM-YYYY"
                        onChange={(newValue) => setFechaFin(newValue?newValue:dayjs())}
                    />            
                </LocalizationProvider>   
                </CardContent>
            </Card>

  
               
            <Grid container className='fadeIn' sx={{ mt:2}}>
                <Grid item xs={12} sx={{ height:700, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        initialState={{
                        pagination: { paginationModel: { pageSize: 10 }},
                        sorting:{
                            sortModel: [{ field: 'id', sort: 'desc' }],
                        }
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>
            </Grid>
        </>
    )
}
