'use client'
import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import { useParams } from 'next/navigation'

import { MainLayout } from '@/components'
import { useForm } from 'react-hook-form';

import { initialData } from '@/data/seed-data'
import { OrderDetail, OrderSummary } from '@/components/orders'
import { OrderContext } from '@/context'
import { IOrder } from '@/interfaces'
import { useOrder } from '@/hooks'
import { formatDecimals } from '@/helpers'

interface Props {
    numberOfItems : number;
    subTotal : number;
    tax : number;
    total : number;
}

const Page: NextPage = () => {

    const { slug } = useParams<{ slug: string }>()
    const { orden, isLoading, error } = useOrder(slug)

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
                    <OrderDetail editable={true} order={orden}/>
                </Grid>
                <Grid item xs={12} sm={5} sx={{mt:2}}>
                    <OrderSummary numberOfItems={numberOfItems} subTotal={subTotal} tax={tax} total={total}/>                       
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default Page