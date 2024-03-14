'use client'
import { FullScreenLoading, MainLayout, OrderSummary } from '@/components'
import { BillingCustomer } from '@/components/billing'
import { useOrder } from '@/hooks'
import { Typography, Grid } from '@mui/material'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'


const Page: NextPage = () => {

    const { slug } = useParams<{ slug: string }>()
    const { orden, isLoading, error } = useOrder(slug)

  return (
    <MainLayout title={'Comprobante'} pageDescription={'Resumen de la compra'}>
        <Typography variant='h1' component='h1' sx={{ mb:'30px' }}>Comprobante</Typography>
        {
          isLoading || !orden
          ?<FullScreenLoading/>
          :<Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
              <BillingCustomer order={ orden }/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
              <OrderSummary numberOfItems={orden.numeroitems} subTotal={orden.subTotal} tax={orden.igv} total={orden.total}/>
            </Grid>
          </Grid>
        }


    </MainLayout>
  )
}

export default Page