"use client"
import { FC, useContext, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { OrderContext } from '@/context';
import { IOrder } from '@/interfaces';
import { formatDecimals } from '@/helpers';


interface Props {
    numberOfItems? : number;
    subTotal?: number;
    tax?: number;
    total?: number;
}

export const OrderSummary: FC<Props> = ({ numberOfItems, subTotal, tax, total }) => {
    
    return (
        <Box>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>{ `Resumen de venta`}</Typography>
                    <Divider sx={{ my:2 }} />

                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={6}>
                            <Typography>No. Productos/Servicios</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>{ numberOfItems?numberOfItems:0 }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>SubTotal</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>S/ { subTotal?subTotal:0 }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography>S/ { tax }</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }}>
                            <Typography variant="subtitle1">Total:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
                            <Typography variant="subtitle1">S/ { total?total:0 }</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>  
        </Box>
    )
}
