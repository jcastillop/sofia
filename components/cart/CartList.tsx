"use client"
import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Link, Stack, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { ICartProduct, IOrder } from '@/interfaces';
import { CartContext } from '@/context/cart';
import { CardTravelOutlined, DryCleaningOutlined } from '@mui/icons-material';
// import { CartContext } from '../../context';
// import { ICartProduct, IOrderItem } from '../../interfaces';


interface Props {
    editable?: boolean;
    order: IOrder;
}

export const CartList: FC<Props> = ({ editable = false, order }) => {

    // const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    // const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    //     product.quantity = newQuantityValue;
    //     updateCartQuantity( product );
    // }

    // const productsToShow = products ? products : cart;

    const { totService } = order.orderItems.filter((item)=>(item.category == "service")).map((item)=>({totService: +item.tot_price}))
    .reduce((a,b)=>{
        return({
            totService: a.totService + b.totService || 0,
        })},{totService: 0})

    const { totProduct } = order.orderItems.filter((item)=>(item.category == "product")).map((item)=>({totProduct: +item.tot_price}))
    .reduce((a,b)=>{
        return({
            totProduct: a.totProduct + b.totProduct || 0,
        })},{totProduct: 0})                                    

    return (
        <Box>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>{ `PLACA: ${order.placa}`}</Typography>
                    <Divider sx={{ my:2 }} />
                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={6}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <DryCleaningOutlined />
                                <Typography variant='h6'>Servicios</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography variant='h6'>S/ {totService}</Typography>
                        </Grid>
                        {
                            order.orderItems.filter(item=>item.category=="service").map(item=>(
                                <Grid container key={item.uid}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6} display='flex' justifyContent='end'>
                                        <Typography>S/ {item.unit_price}</Typography>
                                    </Grid>                                
                                </Grid>
                            ))
                        }                                              
                    </Grid>
                    <Divider sx={{ my:2 }} />
                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={6}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <CardTravelOutlined />                            
                                <Typography variant='h6'>Productos</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography variant='h6'>S/ {totProduct}</Typography>
                        </Grid>       
                        {
                            order.orderItems.filter(item=>item.category=="product").map(item=>(
                                <Grid container key={item.uid}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6} display='flex' justifyContent='end'>
                                        <Typography>S/ {item.unit_price}</Typography>
                                    </Grid>                                
                                </Grid>
                            ))
                        }                                          
                    </Grid>                    
                </CardContent>
            </Card>
        </Box>

        // <>
        //     {
        //         productsToShow && productsToShow.map( product => (
        //             <Grid container spacing={2} key={ product.uid } sx={{ mb:1 }}>

        //                 <Grid item xs={8}>
        //                     <Box display='flex' flexDirection='column'>
        //                         <Typography variant='body1'>{ product.name }</Typography>
        //                         {
        //                             editable 
        //                             ? (
        //                                 <ItemCounter 
        //                                     currentValue={ product.quantity }
        //                                     maxValue={ 10 } 
        //                                     updatedQuantity={ ( value ) => onNewCartQuantityValue(product as ICartProduct, value )}
        //                                 />
        //                             )
        //                             : (
        //                                 <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
        //                             )
        //                         }
                                
        //                     </Box>
        //                 </Grid>
        //                 <Grid item xs={4} display='flex' alignItems='center' flexDirection='column'>
        //                     <Typography variant='subtitle1'>{ `S/ ${ product.unit_price }` }</Typography>
                            
        //                     {
        //                         editable && (
        //                             <Button 
        //                                 variant='text' 
        //                                 color='secondary' 
        //                                 onClick={ () => removeCartProduct( product as ICartProduct ) }
        //                             >
        //                                 Remover
        //                             </Button>
        //                         )
        //                     }
        //                 </Grid>
        //             </Grid>
        //         ))
        //     }
        // </>
    )
}
