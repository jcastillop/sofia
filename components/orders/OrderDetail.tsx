"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { AddCircle, CardTravelOutlined, Create, Delete, DryCleaningOutlined } from '@mui/icons-material';

import { OrderContext } from '@/context/order';
import { FullScreenLoading, ItemCounter } from '../ui';
import { IClienteVehiculo, IOrder, IOrderItem, IUser } from '@/interfaces';
import { ModalNewOrderItem } from '..';
import { deleteOrderItem, updateOrderItem, useOrder, useUsuarios } from '@/hooks';
import { UiContext } from '@/context';
import { getDatetimeFormat } from '@/helpers';
import { UserTextAutocomplete } from '../users';


interface Props {
    editable?: boolean;
    order: IOrder;
    usuarios: IUser[]
}

export const OrderDetail: FC<Props> = ({ editable = false, order:{ _id = "", codigo = "", cliente, fecha, orderitems = [] }, usuarios }) => {

    const { mutate } = useOrder(_id)
    const { showAlert } = useContext( UiContext );
    
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
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='h2'>{ `PLACA: ${codigo.toUpperCase()}`}</Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' justifyContent='end'>
                            <Typography variant='h2'>{ `HORA: ${getDatetimeFormat(fecha)}`}</Typography>
                        </Grid>                        
                    </Grid>
                    
                    {
                        cliente
                        ?<Typography variant='h2' sx={{mt:1}}>{ `CLIENTE: ${cliente.razon_social}`}</Typography>
                        :<></>
                    }
                    <Divider sx={{ my:2 }} />

                    <Grid container sx={{ mt:2 }}>
                        <Grid item xs={4}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                {
                                    editable?
                                    <ModalNewOrderItem category='service' orderItems={orderitems} order={_id}/>:<DryCleaningOutlined/>
                                }
                                <Typography variant='h6'>Servicios</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} display='flex' justifyContent='left' sx={{pl:1}}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography variant='h6'>Usuario</Typography>
                            </Stack>
                            
                        </Grid>                        
                        <Grid item xs={2} display='flex' justifyContent='center'>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography variant='h6'>Cantidad</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={2} display='flex' justifyContent='end'>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography variant='h6'>Total</Typography>
                            </Stack>                            
                        </Grid>

                        <Grid item xs={2} display='flex' justifyContent='center'>
                        </Grid>                        
                        {
                            orderitems.filter(item=>item.categoria=="service").map(item=>(
                                <Grid container key={item._id}>
                                    <Grid item xs={4} display='flex' alignItems='center'>
                                        {
                                            editable?
                                            <IconButton color='secondary' onClick={ () => removeOrderItem( item ) }>
                                                <Delete />
                                            </IconButton>:<></>
                                        }                                        
                                        <Typography variant="body1">{item.nombre}</Typography>
                                    </Grid>
                                    <Grid item xs={4} display='flex' alignItems='center'>
                                        {
                                            editable
                                            ?
                                            item._id
                                            ?<UserTextAutocomplete usuarios={usuarios} item_id={item._id} usuario={item.usuario?(item.usuario as IUser):null}/>
                                            :<></>                                            
                                            :<Typography variant="body1">{item.usuario?(item.usuario as IUser).usuario:null}</Typography>
                                        }
                                        {/* <IconButton color='secondary' onClick={ () => removeOrderItem( item ) }>
                                            <Create />
                                        </IconButton>
                                        {
                                            item.usuario
                                            ?<Typography variant="body1">{(item.usuario  as IUser).usuario}</Typography>
                                            :<>no asignado</>
                                        } */}
                                    </Grid>
                                    <Grid item xs={2} display='flex' justifyContent='center'>
                                        {
                                            editable
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
    )
}
