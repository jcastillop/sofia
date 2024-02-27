"use client"
import { FC, useContext } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { AddCircle, CardTravelOutlined, Delete, DryCleaningOutlined } from '@mui/icons-material';

import { OrderContext } from '@/context/order';
import { ItemCounter } from '../ui';
import { IOrder, IOrderItem } from '@/interfaces';
import { ModalNewOrderItem } from '..';


interface Props {
    editable?: boolean;
    order: IOrder;
}

export const OrderDetail: FC<Props> = ({ editable = false }) => {

    const { placa, orderItems, updateOrderItemQuantity } = useContext(OrderContext);

    const onNewCartQuantityValue = (item: IOrderItem, newQuantityValue: number) => {
        updateOrderItemQuantity( item, newQuantityValue );
    }
    const removeOrderItem = (item: IOrderItem) => {

    }    
    const newOrderItem = (type: string) => {

    }  

    // const { totService } = orderItems.filter((item)=>(item.category == "service")).map((item)=>({totService: +item.tot_price}))
    // .reduce((a,b)=>{
    //     return({
    //         totService: a.totService + b.totService || 0,
    //     })},{totService: 0})

    // const { totProduct } = orderItems.filter((item)=>(item.category == "product")).map((item)=>({totProduct: +item.tot_price}))
    // .reduce((a,b)=>{
    //     return({
    //         totProduct: a.totProduct + b.totProduct || 0,
    //     })},{totProduct: 0})                                    

    return (
        <Box>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>{ `PLACA: ${placa}`}</Typography>
                    <Divider sx={{ my:2 }} />
                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={8}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                {
                                    editable?
                                    <ModalNewOrderItem category='service' orderitems={ orderItems }/>:<DryCleaningOutlined/>
                                }
                                <Typography variant='h6'>Servicios</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={2} display='flex' justifyContent='center'>
                            <Typography variant='h6'>Cantidad</Typography>
                        </Grid>                        
                        <Grid item xs={2} display='flex' justifyContent='end'>
                            <Typography variant='h6'>Total</Typography>
                        </Grid>
                        <Grid item xs={2} display='flex' justifyContent='center'>
                        </Grid>                        
                        {
                            orderItems.filter(item=>item.category=="service").map(item=>(
                                <Grid container key={item.uid}>
                                    <Grid item xs={8} display='flex' alignItems='center'>
                                        {
                                            editable?
                                            <IconButton color='secondary' onClick={ () => removeOrderItem( item ) }>
                                                <Delete />
                                            </IconButton>:<></>
                                        }                                        
                                        <Typography variant="body1">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='center'>
                                        {
                                            editable?
                                            <ItemCounter 
                                                currentValue={ item.quantity }
                                                maxValue={ 99 } 
                                                updatedQuantity={ ( value ) => onNewCartQuantityValue(item, value )}
                                            />:<Typography>{item.quantity}</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='end' alignItems='center'>
                                        <Typography>S/ {item.tot_price.toFixed(2)}</Typography>
                                    </Grid>                                                  
                                </Grid>
                            ))
                        }                                              
                    </Grid>
                    <Divider sx={{ my:2 }} />
                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={8}>
                            <Stack direction="row" alignItems="center" gap={1}>           
                                {
                                    editable?
                                    <ModalNewOrderItem category='product' orderitems={ orderItems }/>:<CardTravelOutlined/>
                                }
                                <Typography variant='h6'>Productos</Typography>
                                {/* <Typography variant="caption" display="block" sx={{ color:'green', fontWeight:'bold' }} gutterBottom>
                                    Nuevo
                                </Typography> */}
                            </Stack>
                        </Grid>
                        <Grid item xs={2} display='flex' justifyContent='center'>
                            <Typography variant='h6'>Cantidad</Typography>
                        </Grid>                        
                        <Grid item xs={2} display='flex' justifyContent='end'>
                            <Typography variant='h6'>Total</Typography>
                        </Grid>
                        <Grid item xs={2} display='flex' justifyContent='end'>
                        </Grid>                        
                        {
                            orderItems.filter(item=>item.category=="product").map(item=>(
                                <Grid container key={item.uid}>
                                    <Grid item xs={8} display='flex' alignItems='center'>
                                        {
                                            editable?
                                            <IconButton color='secondary' onClick={ () => removeOrderItem( item ) }>
                                                <Delete />
                                            </IconButton>:<></>
                                        }
                                        <Typography variant="body1">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='center'>
                                        {
                                            editable?
                                            <ItemCounter 
                                                currentValue={ item.quantity }
                                                maxValue={ 99 } 
                                                updatedQuantity={ ( value ) => onNewCartQuantityValue(item, value )}
                                            />:<Typography>{item.quantity}</Typography>
                                        }
                                    </Grid>                                    
                                    <Grid item xs={2} display='flex' justifyContent='end' alignItems='center'>
                                        <Typography>S/ {item.tot_price.toFixed(2)}</Typography>
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
