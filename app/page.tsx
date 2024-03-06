"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation";

import { FullScreenLoading, MainLayout } from '@/components';
import { Typography } from "@mui/material";
import { initialData } from "@/data/seed-data";
import { ModalNewOrder, OrderList } from "@/components/orders";
import { useOrders } from "@/hooks";

export default function Home() {

  const { ordenes, isLoading, error  } = useOrders();
  // if (!session) {
  //       redirect('/auth')
  // }    
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/auth')
  //   }
  // })  
  return (
    <MainLayout title={`${initialData.params.company}-${initialData.params.description}`} pageDescription={'Productos y servicios de ventas'} imageFullUrl={''}>
        <Typography variant='h1' component='h1'>Órdenes</Typography>
        <Typography variant='h2' sx={{ mb: '10px' }}>Listado de unidades en servicio</Typography>
        <ModalNewOrder/>
        {
              isLoading
              ? <FullScreenLoading/>
              : <OrderList orders={ ordenes }/>
        }        
        
    </MainLayout>
  )
}
