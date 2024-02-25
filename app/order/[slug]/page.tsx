'use client'
import React, { useContext } from 'react'
import { NextPage } from 'next'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import { MainLayout } from '@/components'
import { useForm } from 'react-hook-form';

import { initialData } from '@/data/seed-data'
import { OrderDetail, OrderSummary } from '@/components/orders'
import { OrderContext } from '@/context'
import { IOrder } from '@/interfaces'

type FormData = {
    tipoDocumento: string;
    numeroDocumento: string;
    razonSocial: string;
    direccion: string;
    correo: string;
    placa: string;
}

const Page: NextPage = () => {

    const { isLoaded, ...rest } = useContext(OrderContext)

    const { register, reset, watch, handleSubmit, trigger, setValue, getValues, formState: { errors } }  = useForm<FormData>({
        defaultValues: {
            tipoDocumento: '', numeroDocumento: '', razonSocial: '', direccion: '', correo: '', placa: ''
        }
    });

    const onSubmitOrder = async (data: FormData) => {

    }

    return(
        <MainLayout title={'Servicio'} pageDescription={'Creación o edición de un servicio'}>
            <Typography variant='h1' component='h1'>Detalle de la orden</Typography>
            <form onSubmit={ handleSubmit( onSubmitOrder ) }>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} sx={{mt:2}}>
                        <OrderDetail editable={ true } order={ rest as IOrder }/>
                    </Grid>
                    <Grid item xs={12} sm={5} sx={{mt:2}}>
                        <OrderSummary isCartSummary={false}/>                       
                    </Grid>
                </Grid>
            </form>
        </MainLayout>
    )
}

export default Page