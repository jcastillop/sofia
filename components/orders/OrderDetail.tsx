"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { AddCircle, CardTravelOutlined, Delete, DryCleaningOutlined } from '@mui/icons-material';

import { OrderContext } from '@/context/order';
import { FullScreenLoading, ItemCounter } from '../ui';
import { IOrder, IOrderItem } from '@/interfaces';
import { ModalNewOrderItem } from '..';
import { deleteOrderItem, updateOrderItem, useOrder } from '@/hooks';
import { UiContext } from '@/context';


interface Props {
    editable?: boolean;
    order: IOrder;
}

export const OrderDetail: FC<Props> = ({ editable = false, order:{ _id = "", codigo = "", orderitems = [] } }) => {

    const { mutate } = useOrder(_id)
    const { showAlert } = useContext( UiContext );
    const [loading, setLoading] = useState(false)

    const onNewCartQuantityValue = async (item: IOrderItem, newQuantityValue: number) => {
        const item_id = item._id?item._id:""
        const { hasError, message } = await updateOrderItem(_id, item_id, newQuantityValue)
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        mutate();
    }
    
    const removeOrderItem = (item: IOrderItem) => {
        const item_id = item._id?item._id:""
        deleteOrderItem(_id , item_id)
        mutate();
    }    

    return (
        <Box>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>{ `PLACA: ${codigo.toUpperCase()}`}</Typography>
                    <Divider sx={{ my:2 }} />
                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={8}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                {
                                    editable?
                                    <ModalNewOrderItem category='service' orderItems={orderitems} order={_id}/>:<DryCleaningOutlined/>
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
                            orderitems.filter(item=>item.categoria=="service").map(item=>(
                                <Grid container key={item._id}>
                                    <Grid item xs={8} display='flex' alignItems='center'>
                                        {
                                            editable?
                                            <IconButton color='secondary' onClick={ () => removeOrderItem( item ) }>
                                                <Delete />
                                            </IconButton>:<></>
                                        }                                        
                                        <Typography variant="body1">{item.nombre}</Typography>
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='center'>
                                        {
                                            loading
                                            ? <FullScreenLoading/>
                                            : editable
                                            ? <ItemCounter 
                                                currentValue={ item.cantidad }
                                                maxValue={ 99 } 
                                                updatedQuantity={ ( value ) => onNewCartQuantityValue(item, value )}
                                            />
                                            : <Typography>{item.cantidad}</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='end' alignItems='center'>
                                        <Typography>S/ {item.precio_total.toFixed(2)}</Typography>
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
                                    <ModalNewOrderItem category='product' orderItems={orderitems} order={_id}/>:<CardTravelOutlined/>
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
                            orderitems.filter(item=>item.categoria=="product").map(item=>(
                                <Grid container key={item._id}>
                                    <Grid item xs={8} display='flex' alignItems='center'>
                                        {
                                            editable?
                                            <IconButton color='secondary' onClick={ () => removeOrderItem( item ) }>
                                                <Delete />
                                            </IconButton>:<></>
                                        }
                                        <Typography variant="body1">{item.nombre}</Typography>
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='center'>
                                        {
                                            editable?
                                            <ItemCounter 
                                                currentValue={ item.cantidad }
                                                maxValue={ 99 } 
                                                updatedQuantity={ ( value ) => onNewCartQuantityValue(item, value )}
                                            />:<Typography>{item.cantidad}</Typography>
                                        }
                                    </Grid>                                    
                                    <Grid item xs={2} display='flex' justifyContent='end' alignItems='center'>
                                        <Typography>S/ {item.precio_total.toFixed(2)}</Typography>
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
