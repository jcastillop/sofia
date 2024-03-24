'use client'
import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import { useParams } from 'next/navigation'

import { BillingDeleteOrder, BillingDialogChooseType, MainLayout } from '@/components'
import { useForm } from 'react-hook-form';

import { initialData } from '@/data/seed-data'
import { OrderDetail, OrderSummary } from '@/components/orders'
import { OrderContext } from '@/context'
import { IOrder } from '@/interfaces'
import { useOrder, useUsuarios } from '@/hooks'
import { formatDecimals } from '@/helpers'

const Page: NextPage = () => {

    const { slug, editable } = useParams<{ slug: string, editable: string }>()
    const bEditableValue = editable === 'true';
    const { orden, isLoading, error } = useOrder(slug)
    const { usuarios  } = useUsuarios();

    const numberOfItems = orden?orden.orderitems.reduce( (prev, current) => current.cantidad + prev, 0 ):0;
    const subTotal = formatDecimals(orden?orden.orderitems.reduce( ( prev, current ) => current.valor_total + prev, 0 ):0);
    const tax = formatDecimals(orden?orden.orderitems.reduce( ( prev, current ) => current.igv_total + prev, 0 ):0);
    const total = formatDecimals(orden?orden.orderitems.reduce( ( prev, current ) => current.precio_total + prev, 0 ):0);

    if ( !orden ) return (<></>);

    return(
        <MainLayout title={'Servicio'} pageDescription={'Creación o edición de un servicio'}>
            <Typography variant='h1' component='h1'>Detalle de la orden</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7} sx={{mt:2}}>
                    <OrderDetail editable={bEditableValue} order={orden} usuarios={usuarios}/>
                </Grid>
                <Grid item xs={12} sm={5} sx={{mt:2}}>
                    <OrderSummary numberOfItems={numberOfItems} subTotal={subTotal} tax={tax} total={total}/>
                    <Box sx={{ mt: 3 }}>
                        {
                            bEditableValue
                            ?
                            (
                                total > 0
                                ?<BillingDialogChooseType url={slug} orden={orden}/>
                                :<></>
                            )
                            :<></>
                        }
                        {
                            bEditableValue
                            ?
                            <BillingDeleteOrder/>
                            :<></>
                        }
                        
                    </Box>                    
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default Page