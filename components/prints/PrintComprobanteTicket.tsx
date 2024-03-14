import React, { ReactNode, RefObject, forwardRef } from 'react'
import QRCode from "react-qr-code";

import { useSession } from 'next-auth/react';
import { Grid } from '@mui/material';


import { IBilling, IBillingItem, ICliente, IEmpresa } from '@/interfaces';
import { getDateFormat } from '@/helpers';

export type IPrintPosProps = {
    comprobante: IBilling;
    cliente:ICliente;
    numeracion: string;
};

export const PrintComprobanteTicket = forwardRef(({ comprobante, cliente, numeracion }: IPrintPosProps, ref) => {

    const { data: session, status } = useSession()

    return (
    //   <div style={{ display: "none" }}>
        <div>
            <div ref={ref as RefObject<HTMLDivElement>} style={{ fontSize:11, marginLeft: 14, marginTop:-1, marginRight: 15, paddingLeft: 0, paddingTop: 0 }}>
                <div>
                
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                        <div style={{ fontSize:14 }}>{ (session?.user.empresa as IEmpresa).razon_social }</div>
                        <div style={{ fontSize:10 }}>{ (session?.user.empresa as IEmpresa).direccion }</div>
                        <div style={{ fontSize:12 }}>{ (session?.user.empresa as IEmpresa).ruc }</div>
                    </div>

                    <Grid container spacing={1} sx={{ mt: 0}}>
                        <Grid item xs={6} style={{paddingTop: 0}}>NOTA DE CREDITO ELECTRONICA</Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>{numeracion}</Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>RAZON SOCIAL</Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>{cliente.razon_social}</Grid>              
                        <Grid item xs={6} style={{paddingTop: 0}}>RUC</Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>{cliente.numero_documento}</Grid>   
                        {
                            cliente.vehiculos?
                            <>
                            <Grid item xs={6} style={{paddingTop: 0}}>PLACA</Grid>
                            <Grid item xs={6} style={{paddingTop: 0}}>{ cliente.vehiculos as string }</Grid>              
                            </> 
                            : <></>
                        }

                        <Grid item xs={6} style={{paddingTop: 0}}>FECHA</Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>{ getDateFormat(comprobante.fecha_emision) }</Grid>

                        <Grid item xs={6} style={{paddingTop: 0}}>Usuario: </Grid>
                        <Grid item xs={6} style={{paddingTop: 0}}>{ session?.user.usuario }</Grid>


                        <Grid item xs={4} style={{paddingTop: 0, fontWeight: 'bold'}}>Producto</Grid>
                        <Grid item xs={4} style={{paddingTop: 0, fontWeight: 'bold'}}>Cantidad</Grid>
                        <Grid item xs={4} style={{paddingTop: 0, fontWeight: 'bold'}}>Importe</Grid>
                        {
                            comprobante.items?
                            comprobante.items.map((item)=>{
                                return (
                                    <div key={item.codigo}>
                                        <Grid item xs={4} style={{paddingTop: 0}}>{ item.nombre }</Grid>
                                        <Grid item xs={4} style={{paddingTop: 0}}>{ item.cantidad }</Grid>
                                        <Grid item xs={4} style={{paddingTop: 0}}>S/ { item.valor_total }</Grid>
                                    </div>
                                    )
                            })
                            :<></>
                        }

                        <Grid item xs={4} style={{paddingTop: 0}}></Grid>
                        <Grid item xs={4} style={{paddingTop: 0}}>Total: </Grid>
                        <Grid item xs={4} style={{paddingTop: 0}}>S/{ comprobante.total_venta }</Grid>                          
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