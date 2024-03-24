import { FC, useContext } from "react";
import NextLink from 'next/link';
import { Grid, Card, CardHeader, IconButton, Badge, CardContent, Typography, CardActions, Button, Box, Stack, Link } from "@mui/material";
import { DryCleaningOutlined, CardTravelOutlined } from '@mui/icons-material';
import { IOrder } from "@/interfaces";
import { OrderContext } from "@/context";
import { getTimeFormat } from "@/helpers";

interface Props {
    order: IOrder;
}

export const OrderCard: FC<Props> = ({ order }) => {

    return (
        <Grid item 
            xs={6} 
            sm={ 3 }
        >
            <Card style={{
            padding: '30px 20px',
            borderTop:'3px solid #F6F6F6'
            }}>
                <NextLink 
                
                    href={`/order/${order._id}/${true}`} 
                    aria-disabled={true}
                    passHref 
                    prefetch={false} 
                    legacyBehavior>
                    <Link>
                        <div style={{
                            position:'relative'
                        }}>                    
                            <div style={{
                            //height: '156px',
                            height: '160px',
                            width: '160px',
                            backgroundColor: 'green',
                            zIndex:1,
                            position:'absolute',
                            top: '-130px',
                            right: '-130px',
                            borderRadius: '50%',
                            WebkitTransition:'all .5s ease',
                            transition:'all .5s ease'
                            }}>
                                <Typography fontWeight={700} style={{color:"#ffff", position:'relative',bottom: '-100px',left: '13px'}}>{ getTimeFormat(order.fecha) }</Typography>
                            </div>                    
                            <Box sx={{mt: 1}} className='fadeIn'>  
                                <Typography gutterBottom variant="h4" component="div">{ order.codigo.toUpperCase() }</Typography>
                                <Box sx={{ mt:2 }}>
                                    <Stack direction="row" alignItems="center" gap={1} sx={{mt:1}}>
                                        <DryCleaningOutlined />
                                        <Typography variant="body1">Servicios</Typography>
                                    </Stack>
                                    <Typography variant="body1">{order.orderitems.filter(item=>item.categoria=="service").map( item=>item.nombre).toString()}</Typography>
                                </Box>
                                <Box sx={{ mt:2 }}>
                                    <Stack direction="row" alignItems="center" gap={1} sx={{mt:1}}>
                                        <CardTravelOutlined />
                                        <Typography variant="body1">Productos</Typography>
                                    </Stack>
                                    <Typography variant="body1">{order.orderitems.filter(item=>item.categoria=="product").map( item=>item.nombre).toString()}</Typography>
                                </Box>
                            </Box>  
                        </div>           
                    </Link>
                </NextLink>
            </Card>
        </Grid>
    )
}