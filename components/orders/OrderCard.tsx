import { FC } from "react";
import NextLink from 'next/link';
import { Grid, Card, CardHeader, IconButton, Badge, CardContent, Typography, CardActions, Button, Box, Stack, Link } from "@mui/material";
import { DryCleaningOutlined, CardTravelOutlined } from '@mui/icons-material';
import { IOrder } from "@/interfaces";

interface Props {
    order: IOrder;
}

export const OrderCard: FC<Props> = ({ order }) => {
    return (
        <Grid item 
            xs={6} 
            sm={ 4 }
        >

            <NextLink 
                href={`/order/${order.uid}`} 
                aria-disabled={true}
                passHref 
                prefetch={false} 
                legacyBehavior>
                <Link>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>             
                            <Typography gutterBottom variant="h4" component="div">{ order.placa }</Typography>
                            <Box sx={{ mt:2 }}>
                                <Stack direction="row" alignItems="center" gap={1} sx={{mt:1}}>
                                    <DryCleaningOutlined />
                                    <Typography variant="body1">Servicios</Typography>
                                </Stack>
                                {
                                    order.orderItems.filter(item=>item.category=="service").map(item=>(
                                        <Typography key={item.uid} variant="body1">{item.name}</Typography>
                                    ))
                                }
                            </Box>
                            <Box sx={{ mt:2 }}>
                                <Stack direction="row" alignItems="center" gap={1} sx={{mt:1}}>
                                    <CardTravelOutlined />
                                    <Typography variant="body1">Productos</Typography>
                                </Stack>
                                {
                                    order.orderItems.filter(item=>item.category=="product").map(item=>(
                                        <Typography key={item.uid} variant="body1">{item.name}</Typography>
                                    ))
                                }
                            </Box>
                        </CardContent>
                    </Card>                
                </Link>
            </NextLink>

      </Grid>
    )
}