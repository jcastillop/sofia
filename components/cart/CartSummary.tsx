"use client"
import { FC, useContext } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';

interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    },
    isCartSummary: boolean;
}

export const CartSummary: FC<Props> = ({ orderValues, isCartSummary }) => {
    
    const { numberOfItems, subTotal, total, tax } = useContext( CartContext );
    
    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax };

    return (
        <Box>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>{ isCartSummary?`Orden`:`Resumen de venta`}</Typography>
                    <Divider sx={{ my:2 }} />

                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={6}>
                            <Typography>No. Productos</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>{summaryValues.numberOfItems} { summaryValues.numberOfItems > 1 ? 'productos': 'producto' }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>SubTotal</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>{ summaryValues.subTotal }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>{ summaryValues.tax }</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }}>
                            <Typography variant="subtitle1">Total:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
                            <Typography variant="subtitle1">{ summaryValues.total }</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>  
        </Box>
    )
}
