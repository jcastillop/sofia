"use client"
import { FC, useContext } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { OrderContext } from '@/context';


interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    },
    isCartSummary: boolean;
}

export const OrderSummary: FC<Props> = ({ orderValues, isCartSummary }) => {
    
    const { numberOfItems, subTotal, total, tax } = useContext( OrderContext );
    
    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax };

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
                            <Typography>{summaryValues.numberOfItems}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>SubTotal</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>S/ { summaryValues.subTotal.toFixed(2) }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>S/ { summaryValues.tax.toFixed(2) }</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }}>
                            <Typography variant="subtitle1">Total:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
                            <Typography variant="subtitle1">S/ { summaryValues.total.toFixed(2) }</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>  
        </Box>
    )
}