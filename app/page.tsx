"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation";

import { MainLayout } from '@/components';
import { Typography } from "@mui/material";
import { initialData } from "@/data/seed-data";
import { OrderList } from "@/components/orders";

export default function Home() {
  // const { data: session } = useSession()
  // console.log(session)
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
        <Typography variant='h2' sx={{ mb: '30px' }}>Listado de unidades en servicio</Typography>

        {
          <OrderList orders={ initialData.orders } />
        }

    </MainLayout>
  )
}
