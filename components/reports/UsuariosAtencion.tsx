import React, { useState } from 'react'

import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { getDatetimeFormat } from '@/helpers';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useReporteUsuariosServicios } from '@/hooks';
import { IReprteServiciosCantidad, IUser } from '@/interfaces';
import dayjs, { Dayjs } from 'dayjs';

export const UsuariosAtencion = () => {

    const [fechaInicio, setFechaInicio] = useState<Dayjs>(dayjs());
    const [fechaFin, setFechaFin] = useState<Dayjs>(dayjs());

    const { servicios, hasError, isLoading } = useReporteUsuariosServicios(fechaInicio.toDate() , fechaFin.toDate());

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', width: 80, disableColumnMenu: true },
        { field: 'servicio', headerName: 'Servicio', width: 250, sortable: false },
        { field: 'usuario', headerName: 'Usuario', width: 150, sortable: false },
        { field: 'cantidad', headerName: 'Cantidad', width: 100 },
        { field: 'fecha', headerName: 'Fecha', width: 200, sortable: false }
    ]

    if ( !servicios ) return (<></>);

    const rows = servicios.map( (serv: IReprteServiciosCantidad) => ({
        id          : serv.id,
        cantidad    : serv.cantidad,
        servicio    : serv.servicio,
        usuario     : serv.usuario,
        fecha       : serv.fecha,
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
                            sortModel: [{ field: 'fecha', sort: 'desc' }],
                            }
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>
            </Grid>
        </>
    )
}
