import React, { ReactNode, RefObject, forwardRef } from 'react'
import QRCode from "react-qr-code";

import { useSession } from 'next-auth/react';
import { Grid } from '@mui/material';


import { IBilling, IBillingItem, ICliente, IEmpresa } from '@/interfaces';
import { Constantes, getDateFormat, getDescripcionTipocomprobante } from '@/helpers';

export type IPrintPosProps = {
    comprobante: IBilling;
    cliente:ICliente;
    numeracion: string;
};

export const PrintComprobanteTicket = forwardRef(({ comprobante, cliente, numeracion }: IPrintPosProps, ref) => {

    const { data: session, status } = useSession()
    if(!session){
        return<></>
    }
    //<div style={{ display: 'none' }}>
    return (
        <div style={{ display: 'none' }}>
            <div ref={ref as RefObject<HTMLDivElement>} style={{ fontSize:11, marginLeft: 14, marginTop:-1, marginRight: 15, paddingLeft: 0, paddingTop: 0 }}>
                <div>
                    
                    <Grid container spacing={1} sx={{ mt: 2}}>
                        <Grid item xs={12} display='flex' justifyContent='center' style={{fontWeight: 'bold'}}>{ (session?.user.empresa as IEmpresa).razon_social }</Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' style={{fontWeight: 'bold'}}>{ (session?.user.empresa as IEmpresa).direccion }</Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' style={{fontWeight: 'bold'}}>{ (session?.user.empresa as IEmpresa).ruc }</Grid>
                    </Grid>

                    <Grid container spacing={1} sx={{ mt: 2}}>
                        <Grid item xs={12} display='flex' justifyContent='center' style={{fontWeight: 'bold'}}>{ getDescripcionTipocomprobante(comprobante.tipo_comprobante) }</Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' style={{fontWeight: 'bold'}}>{numeracion}</Grid>
                        <Grid item xs={6}>{ (comprobante.tipo_comprobante==Constantes.TipoComprobante.Factura)?'RAZON SOCIAL':'NOMBRE' }</Grid>
                        <Grid item xs={6}>{cliente.razon_social}</Grid>              
                        <Grid item xs={6}>{ (comprobante.tipo_comprobante==Constantes.TipoComprobante.Factura)?'RUC':'DNI' }</Grid>
                        <Grid item xs={6}>{cliente.numero_documento}</Grid>   
                        {
                            cliente.vehiculos?
                            <>
                            <Grid item xs={6} style={{paddingTop: 0}}>PLACA</Grid>
                            <Grid item xs={6} style={{paddingTop: 0}}>{ cliente.vehiculos as string }</Grid>              
                            </> 
                            : <></>
                        }

                        <Grid item xs={6} >FECHA</Grid>
                        <Grid item xs={6} >{ getDateFormat(comprobante.fecha_emision) }</Grid>

                        <Grid item xs={6} >Usuario: </Grid>
                        <Grid item xs={6} >{ session?.user.usuario }</Grid>


                        <Grid item xs={4} style={{fontWeight: 'bold'}}>Producto</Grid>
                        <Grid item xs={4} style={{fontWeight: 'bold'}} display='flex' justifyContent='end'>Cantidad</Grid>
                        <Grid item xs={4} style={{fontWeight: 'bold'}} display='flex' justifyContent='end'>Importe</Grid>
                        <Grid container spacing={1} sx={{ mt: 1, paddingLeft:2}}>
                        {
                            comprobante.items?
                            comprobante.items.map((item)=>{
                                return (
                                    <Grid container key={item.codigo}>
                                        <Grid item xs={4} sx={{ margin:0, padding:0 }} >{ item.nombre }</Grid>
                                        <Grid item xs={4} sx={{ margin:0, padding:0 }} display='flex' justifyContent='end'>{ item.cantidad }</Grid>
                                        <Grid item xs={4} sx={{ margin:0, padding:0 }} display='flex' justifyContent='end'>S/ { item.valor_total }</Grid>
                                    </Grid>
                                    )
                            })
                            :<></>
                        }
                        </Grid>
                        <Grid container spacing={1} sx={{ mt: 2}}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4} display='flex' justifyContent='end' style={{fontWeight: 'bold'}}>SubTotal: </Grid>
                            <Grid item xs={4} display='flex' justifyContent='end' style={{fontWeight: 'bold'}}>S/{ comprobante.total_gravadas }</Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4} display='flex' justifyContent='end' style={{fontWeight: 'bold'}}>IGV: </Grid>
                            <Grid item xs={4} display='flex' justifyContent='end' style={{fontWeight: 'bold'}}>S/{ comprobante.total_igv }</Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4} display='flex' justifyContent='end' style={{fontWeight: 'bold'}}>Total: </Grid>
                            <Grid item xs={4} display='flex' justifyContent='end' style={{fontWeight: 'bold'}}>S/{ comprobante.total_venta }</Grid>                                                
                        </Grid>

                    </Grid>

                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 80, width: "100%", marginTop:8 }}>
                        <QRCode
                            size={350}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={ comprobante.cadena_para_codigo_qr?comprobante.cadena_para_codigo_qr:'' }
                            viewBox={`0 0 256 256`}
                        />
                    </div>          
                    <div>V.RESUMEN: {comprobante.codigo_hash}</div>        
                </div>
            </div>
        </div>
    );
});

PrintComprobanteTicket.displayName = 'PrintComprobanteTicket';