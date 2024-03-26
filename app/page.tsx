"use client"
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation";

import { FullScreenLoading, MainLayout } from '@/components';
import { Typography } from "@mui/material";
import { initialData } from "@/data/seed-data";
import { ModalNewOrder, OrderList } from "@/components/orders";
import { useOrders } from "@/hooks";
import { Constantes } from "@/helpers";

interface Props{
  title : string
  subtitle : string
}

export default function Home() {

  const { ordenes, isLoading, error  } = useOrders();

  const { data: session, status } = useSession()

  const props: Props = {
    title: session?.user.empresa?._id===Constantes.Empresas.SPAXION?"Servicios":"Órdenes",
    subtitle: session?.user.empresa?._id===Constantes.Empresas.SPAXION?"Atenciones en curso":"Listado de unidades en servicio"
  }

  return (
    <MainLayout title={`${initialData.params.company}-${initialData.params.description}`} pageDescription={'Productos y servicios de ventas'} imageFullUrl={''}>
        <Typography variant='h1' component='h1'>{ props.title }</Typography>
        <Typography variant='h2' sx={{ mb: '10px' }}>{ props.subtitle }</Typography>
        <ModalNewOrder/>
        {
              isLoading
              ? <FullScreenLoading/>
              : <OrderList orders={ ordenes }/>
        }        
        
    </MainLayout>
  )
}
