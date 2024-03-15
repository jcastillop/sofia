"use client"
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { PhoneAndroid, Search } from '@mui/icons-material';
import { Card, CardContent, Grid, ToggleButtonGroup, ToggleButton, TextField, InputAdornment, IconButton, Box, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';

import { UiContext } from '@/context';
import { consultaRuc, saveComprobante } from '@/hooks';
import { Constantes, formatDecimals } from '@/helpers';
import { IBilling, IBillingItem, ICliente, IOrder, PrintComprobanteTicketProps } from '@/interfaces';
import { PrintComprobanteTicket } from '..';
import { initialDataPrintComprobanteTicket } from '@/data/seed-data';

interface Props {
    order: IOrder
}

type FormData = {
    numeroDocumento: string;
    razonSocial: string;
    direccion: string;
    telefono: string;
    correo: string;
    celular: string;
    tarjeta: number;
    efectivo: number;
    yape: number;
}

export const BillingCustomer:FC<Props> = ({ order:{ _id = "", codigo, cliente, subTotal, igv, total, orderitems } }) => {

    const router = useRouter();
    const componentRef = useRef();    
    const { data: session, status } = useSession()
    const { showAlert } = useContext( UiContext );

    const [tipoComprobante, setTipoComprobante] = useState<string>(cliente?.numero_documento.length===11?'01':'03');

    const { register, reset, setValue, handleSubmit, getValues, formState: { errors } }  = useForm<FormData>({
        defaultValues: {
            numeroDocumento: cliente?.numero_documento||'', razonSocial: cliente?.razon_social||'', direccion: cliente?.direccion||'', telefono: '', correo: cliente?.correo||'', tarjeta: 0, efectivo: total, yape: 0
        }
    });

    //const [printValues, setPrintValues] = useState<PrintComprobanteTicketProps>(initialDataPrintComprobanteTicket)
    const [ printValuesBilling, setPrintValuesBilling ] = useState<IBilling>(initialDataPrintComprobanteTicket.bill)
    const [ printValuesClient, setPrintValuesClient ] = useState<ICliente>(initialDataPrintComprobanteTicket.client)
    const [ numeracion, setNumeracion ] = useState('')

    useEffect(() => {
        var items:IBillingItem[] = [];
        
        orderitems.forEach(item => {
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



        const bill:IBilling = {
            tipo_comprobante: tipoComprobante,
            fecha_emision: new Date(),
            total_gravadas: subTotal,
            total_igv: igv,
            total_venta: total,
            pago_tarjeta: 0,
            pago_efectivo: 0,
            pago_yape: 0,
            usuario: session?.user.id,
            items: items,
            tipo_facturacion: Constantes.SeriesProposito.PRINCIPAL_BILL
        }
        //setPrintValues({bill, client})
        setPrintValuesBilling(bill)
    }, [igv, orderitems, session?.user.id, subTotal, tipoComprobante, total])

    useEffect(() => {
        const client:ICliente = {
            tipo_documento: getValues("numeroDocumento").length===11?6:0,
            numero_documento: getValues("numeroDocumento"),
            razon_social: getValues("razonSocial"),
            direccion: getValues("direccion"),
            telefonos: getValues("telefono"),
            correo: getValues("correo")
        }
        setPrintValuesClient(client)
    }, [getValues])
    
    

 

    const handleTipoDocumento = (event: React.MouseEvent<HTMLElement>,nuevoTipoDocumento: string) => {
        setTipoComprobante(nuevoTipoDocumento);
        reset({ numeroDocumento: '', razonSocial: '', direccion: '', telefono: '', correo: ''});  
    };

    const handleClickMedioPago = (medioPago : 'tarjeta'|'efectivo'|'yape') => {
        setValue('tarjeta', 0, { shouldValidate: true });
        setValue('efectivo', 0, { shouldValidate: true });
        setValue('yape', 0, { shouldValidate: true });
        setValue(medioPago, total, { shouldValidate: true });
    }

    const handlePrint = useReactToPrint({
        pageStyle: "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",        
        content: () => componentRef.current || null,
        onAfterPrint: () => {
            router.push('/');
          }        
    });    

    const HandleConsultaCliente = async () => {

        const { hasError, razon_social, direccion } = await consultaRuc(getValues("numeroDocumento"))
        if(!hasError && razon_social && direccion){
            showAlert({mensaje: 'Cliente encontrado'})
            reset({ razonSocial: '', direccion: '', telefono: '', correo: ''});
            setValue("razonSocial", razon_social, { shouldValidate: true });
            setValue("direccion", direccion, { shouldValidate: true });
        }else{
            showAlert({mensaje: 'Cliente NO encontrado, se registrará un nuevo cliente', severity: 'warning', time: 3000})
        }
    }

    const onSubmitBilling = async (data: FormData) => {

        const { ...valBill } = printValuesBilling
        valBill.pago_tarjeta = data.tarjeta
        valBill.pago_efectivo = data.efectivo
        valBill.pago_yape = data.yape
        //const bill: IBilling = valBill as IBilling
        
        
        const { ...valClient } = printValuesClient
        valClient.tipo_documento= data.numeroDocumento.length===11?6:0
        valClient.numero_documento= data.numeroDocumento
        valClient.razon_social= data.razonSocial
        valClient.direccion= data.direccion
        valClient.correo= data.correo
        valClient.telefonos= data.telefono
        valClient.vehiculos= codigo

        //const client: ICliente = valClient as ICliente
        
        //setPrintValues({ bill, client})

        const { message, hasError, comprobante } = await saveComprobante(valBill, _id, valClient)

        showAlert({mensaje: message, severity: hasError?'error':'success', time: hasError?7000:1500})

        if(!hasError && comprobante){            
            setNumeracion(comprobante.numeracion_comprobante?comprobante.numeracion_comprobante:'')
            await setTimeout(function(){      
                handlePrint();
            }, 2000);
        }else{
            router.push('/');
        }
    } 
    
    const SearchButton = () => (
        <IconButton onClick={ HandleConsultaCliente }>
          <Search />
        </IconButton>
    )

    return (
        <Card className='sumary-card'>
            <CardContent>
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" >
                    <ToggleButtonGroup
                        value={tipoComprobante}
                        exclusive
                        onChange={handleTipoDocumento}
                        aria-label="Tipo de documento"        
                        sx={{ mt: 1 }} 
                        color='secondary'
                    >
                        <ToggleButton value="03">BOLETA</ToggleButton>
                        <ToggleButton value="01">FACTURA</ToggleButton>
                    </ToggleButtonGroup>    
                </Grid>
                <PrintComprobanteTicket ref={componentRef} comprobante={printValuesBilling} cliente={printValuesClient} numeracion={numeracion}/>
                <form onSubmit={ handleSubmit( onSubmitBilling ) }>
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            label={(tipoComprobante=='03'||tipoComprobante=='51')?'DNI':'RUC'}
                            variant='standard' 
                            fullWidth
                            { ...register('numeroDocumento', {
                                validate:{
                                    required: (value: any) => {
                                        if (!value) return 'Este campo es requerido';
                                        return true;
                                    },
                                },
                                pattern: {
                                    value: (tipoComprobante=='03'||tipoComprobante=='51')?/^([0-9]{8}|0)$/:/^([0-9]{11})$/,
                                    message: `El ${ (tipoComprobante=='03'||tipoComprobante=='51')?'DNI':'RUC' } ingresado es incorrecto`
                                }
                            })}
                            InputLabelProps={{ shrink: true }} 
                            error={ !!errors.numeroDocumento }
                            helperText={ errors.numeroDocumento?.message }
                            InputProps={{endAdornment: <SearchButton />}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            label={(tipoComprobante=='03'||tipoComprobante=='51')?'Nombres':'Razón social'}
                            variant='standard' 
                            fullWidth
                            { ...register('razonSocial', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.razonSocial }
                            helperText={ errors.razonSocial?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} display={{ xs: (tipoComprobante=='03'||tipoComprobante=='51')?"none":"block" }}>
                        <TextField 
                            label='Direccion' 
                            variant='standard' 
                            InputLabelProps={{ shrink: true }} 
                            fullWidth
                            { ...register('direccion')}
                            error={ !!errors.direccion }
                            helperText={ errors.direccion?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='Teléfono' 
                            variant='standard' 
                            InputLabelProps={{ shrink: true }} 
                            fullWidth
                            { ...register('telefono')}
                            error={ !!errors.telefono }
                            helperText={ errors.telefono?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label='Correo' 
                            variant='standard' 
                            InputLabelProps={{ shrink: true }} 
                            fullWidth
                            { ...register('correo')}
                            error={ !!errors.correo }
                            helperText={ errors.correo?.message }
                        />
                    </Grid>                                        
                    <Grid item xs={4} sm={4}>
                        <TextField
                            label="Tarjeta"
                            variant="standard"
                            type='number'
                            fullWidth
                            { ...register('tarjeta') }
                            error={ !!errors.tarjeta }
                            helperText={ errors.tarjeta?.message }
                            // onChange={handleTarjetaValueChange}
                            inputProps={{
                                maxLength: 5,
                                step: 0.01
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickMedioPago('tarjeta')}>
                                            <CreditCardIcon color="secondary"/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />                                         
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <TextField
                            label="Efectivo"
                            variant='standard' 
                            type='number'
                            fullWidth
                            { ...register('efectivo') }
                            error={ !!errors.efectivo }
                            helperText={ errors.efectivo?.message }  
                            // onChange={handleEfectivoValueChange}
                            inputProps={{
                                maxLength: 5,
                                step: 0.01
                            }}                                                                                           
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickMedioPago('efectivo')}
                                        >
                                            <PaymentsIcon color="success"/>
                                        </IconButton>                                                            
                                        
                                    </InputAdornment>
                                ),
                            }}
                        />  
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <TextField
                            label="Yape/Plin"
                            variant='standard' 
                            type='number'
                            fullWidth
                            { ...register('yape') }
                            error={ !!errors.yape }
                            helperText={ errors.yape?.message }  
                            // onChange={handleEfectivoValueChange}
                            inputProps={{
                                maxLength: 5,
                                step: 0.01
                            }}                                                                                           
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickMedioPago('yape')}
                                        >
                                            <PhoneAndroid color="warning"/>
                                        </IconButton>                                                            
                                        
                                    </InputAdornment>
                                ),
                            }}
                        />  
                    </Grid>                                        
                </Grid>
                <Box sx={{ mt: 3}}>
                    <Button
                        color='secondary'
                        className='circular-btn'
                        fullWidth
                        // disabled={isLoaded}
                        type='submit'
                    >                           
                        Confirmar orden
                    </Button>
                </Box>                
                </form>
            </CardContent>
        </Card>
    )
}
