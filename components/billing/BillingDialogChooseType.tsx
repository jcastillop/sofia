"use client"
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";

import { UiContext } from "@/context/ui";
import { saveComprobante, useOrder } from "@/hooks";
import { initialDataPrintComprobanteTicket } from "@/data/seed-data";
import { PrintComprobanteTicketProps, IBilling, ICliente, IOrder, IBillingItem } from "@/interfaces";
import { useReactToPrint } from "react-to-print";
import { Constantes, formatDecimals } from "@/helpers";
import { useSession } from "next-auth/react";
import { PrintComprobanteTicket } from "..";

interface Props {
    url: string;
    orden: IOrder;
}

export const BillingDialogChooseType: FC<Props> = ( { url, orden }) => {

    const router = useRouter();
    const componentRef = useRef();    
    const { data: session, status } = useSession()
    const { showAlert } = useContext( UiContext );
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [numeracion, setNumeracion] = useState('')

    const [printValues, setPrintValues] = useState<PrintComprobanteTicketProps>(initialDataPrintComprobanteTicket)

    useEffect(() => {
        var items:IBillingItem[] = [];
        
        orden.orderitems.forEach(item => {
            const itemBill:IBillingItem = {
                nombre: item.nombre,
                categoria: item.categoria,
                codigo: item.codigo,
                codigo_sunat: item.codigo_sunat,
                cantidad: item.cantidad,
                descripcion: item.descripcion,
                precio_unitario: item.precio_unitario,
                valor_unitario: item.valor_unitario,
                unidad_medida: item.unidad_medida,
                precio_total: formatDecimals(item.precio_total),
                valor_total: formatDecimals(item.valor_total),
                igv: item.igv,
                igv_total: formatDecimals(item.igv_total),
                descuento: item.descuento,
                fecha: new Date()
            }
            items.push(itemBill);
        });    

        const client:ICliente = {
            tipo_documento: 0,
            numero_documento: '0',
            razon_social: 'clientes varios',
            direccion: ''
        }            
       
        const bill:IBilling = {
            tipo_comprobante: Constantes.TipoComprobante.Interno,
            fecha_emision: new Date(),
            total_gravadas: orden.subTotal,
            total_igv: orden.igv,
            total_venta: orden.total,
            pago_tarjeta: orden.total,
            pago_efectivo: 0,
            pago_yape: 0,
            usuario: session?.user.id,
            items: items,
            tipo_facturacion: Constantes.SeriesProposito.PRINCIPAL_BILL
        }
        
        setPrintValues({ bill, client})
    },[orden.igv, orden.orderitems, orden.subTotal, orden.total, session?.user.id])

    const onSubmiBillingType = async () => {
        if (orden) {
            const _id = orden._id?orden._id:''
            
            const { message, hasError, comprobante } = await saveComprobante(printValues.bill, _id, printValues.client)
    
            showAlert({mensaje: message, severity: hasError?'error':'success', time: hasError?7000:1500})
    
            if(!hasError && comprobante){            
                setNumeracion(comprobante.numeracion_comprobante?comprobante.numeracion_comprobante:'')
                await setTimeout(function(){      
                    handlePrint();
                }, 2000);
            }else{
                router.push('/');
            }            
        }else{
            showAlert({mensaje: 'Ocurrio un error durante la obteción de la orden', severity: 'error', time: 5000})
        }
    }      

    const handlePrint = useReactToPrint({
        pageStyle: "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",        
        content: () => componentRef.current || null,
        onAfterPrint: () => {
            router.push('/');
        }        
    });  

    return(
    <>
        <Button color="secondary" className='circular-btn' fullWidth onClick={handleClickOpen} sx={{maxHeight:30, minHeight:30}}>
            Confirmar
        </Button>
        <PrintComprobanteTicket ref={componentRef} comprobante={printValues.bill} cliente={printValues.client} numeracion={numeracion}/>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" sx={{ textAlign: "center"}}>
            <DialogTitle>{`Seleccione tipo de comprobante`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={6}>
                        <Button onClick={onSubmiBillingType} color='secondary' className='circular-big-btn' type='submit'>
                            Boleta rápida
                        </Button>   
                    </Grid> 
                    <Grid item xs={6} sm={6}>
                        <Button color='primary' className='circular-big-btn' href={`/billing/${url}`}>
                        Otro
                        </Button>   
                    </Grid> 
                </Grid>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    </>
    )
}