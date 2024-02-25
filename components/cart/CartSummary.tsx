"use client"
import { FC, useContext } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';
import { IOrder } from '@/interfaces';


interface Props {
    isCartSummary: boolean;
    order: IOrder;
}

export const CartSummary: FC<Props> = ({ order, isCartSummary }) => {
    
    const { numberOfItems, subTotal, total, tax } = useContext( CartContext );

    return (
        <Box>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>{ isCartSummary?`Orden`:`Resumen de venta`}</Typography>
                    <Divider sx={{ my:2 }} />

                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={6}>
                            <Typography>No. Productos/Servicios</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>{order.numberOfItems} { order.numberOfItems > 1 ? 'productos': 'producto' }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>SubTotal</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>S/ { order.subTotal }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) }%)</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>S/ { order.tax }</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }}>
                            <Typography variant="subtitle1">Total:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
                            <Typography variant="subtitle1">S/ { order.total }</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>  
        </Box>
    )
}
