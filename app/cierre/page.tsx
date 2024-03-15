'use client'
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Typography, Grid, Divider, Card, CardContent, List, ListItem, ListItemText, Chip } from '@mui/material'

import { MainLayout } from '@/components';
import { CierreDialog } from '@/components/cierre/CierreDialog';
import { useCierres } from '@/hooks';
import { getDatetimeFormat } from '@/helpers';
import { CreditCard, PhoneAndroid } from '@mui/icons-material';
import PaymentsIcon from '@mui/icons-material/Payments';

const CierrePage: NextPage = () => {

    const { data: session, status } = useSession()

    const { error, isLoading, cierre, cierres } = useCierres(session?.user.id?session?.user.id:'')

    return(
        <>
            <MainLayout title={'Pos - Shop'} pageDescription={'Productos de POS'} imageFullUrl={''}>
            <Typography variant='h1' component = 'h1'>Cierre de turno</Typography>
            
                <Grid container  spacing={2} sx={{ marginTop: 2 }}>

                    <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="div">Histórico</Typography>
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">(últimos 5 cierres)</Typography> 
                        {
                            cierres? cierres.map( item => (
                                <Card className='summary-card' sx={{ maxWidth: 600 , margin:1 }} key={ item._id }>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={4} >
                                                <Typography>{ getDatetimeFormat(item.fecha) }</Typography>
                                            </Grid>
                                            <Grid item xs={4} >
                                                <Typography sx={{ fontWeight: 'bold' }}>TOTAL: { item.total.toFixed(2)  }</Typography>
                                            </Grid>  
                                            <Grid item xs={4} >
                                            </Grid>                                                      
                                            <Grid item xs={4} sx={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
                                                <PaymentsIcon color='success'/><span> S/ { item.efectivo.toFixed(2) }</span>
                                            </Grid>                        
                                            <Grid item xs={4} sx={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
                                                <CreditCard color='secondary'/><span> S/ { item.tarjeta.toFixed(2) }</span>
                                            </Grid>
                                            <Grid item xs={4} sx={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
                                                <PhoneAndroid color='warning'/><span> S/ { item.yape.toFixed(2) }</span>
                                            </Grid>
                                        </Grid>                             
                                    </CardContent>
                                </Card>                                                                                                                                        
                                )):<></>
                        }
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" component="div">Venta del día</Typography>
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">Galones / Soles / Tipo pago</Typography>                                                
                        <Card className='summary-card' sx={{ maxWidth: 600 , margin:1 }}>
                            <CardContent>

                                <Typography component="div" sx={{ fontWeight: 'bold' }}>VENTA POR TIPO DE PAGO</Typography>
                                <Grid container>
                                    {
                                        cierre?<>
                                            <Grid item xs={6} sx={{ marginTop: 1, marginBottom: 0.5}}><Typography sx={{ fontWeight: 'bold' }}>TIPO</Typography></Grid>
                                            <Grid item xs={6} display='flex' justifyContent='end'><Typography sx={{ fontWeight: 'bold' }}>TOTAL</Typography></Grid>                                     
                                            <Grid item xs={6} ><Typography>EFECTIVO</Typography></Grid>
                                            <Grid item xs={6}  display='flex' justifyContent='end'><Typography>S/ { cierre.efectivo.toFixed(2) }</Typography></Grid>
                                            <Grid item xs={6} ><Typography>TARJETA</Typography></Grid>
                                            <Grid item xs={6}  display='flex' justifyContent='end'><Typography>S/ { cierre.tarjeta.toFixed(2) }</Typography></Grid>
                                            <Grid item xs={6} ><Typography>YAPE</Typography></Grid>
                                            <Grid item xs={6}  display='flex' justifyContent='end'><Typography>S/ { cierre.yape.toFixed(2) }</Typography></Grid>                                         
                                        </>:<></>
                                    }
                                </Grid>
                                <Divider sx={{ my:1 }} />  
                                <CierreDialog/>
                            </CardContent>
                        </Card>
                    </Grid>                
                </Grid>
    
            </MainLayout>
        </>
    
        )
}
  
export default CierrePage
  
