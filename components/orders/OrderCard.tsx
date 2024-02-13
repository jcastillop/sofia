import { IOrder } from "@/interfaces";
import { LunchDining, ShoppingCartOutlined } from "@mui/icons-material";

import { Grid, Card, CardHeader, IconButton, Badge, CardContent, Typography, CardActions, Button, Box, Stack } from "@mui/material";
import { FC } from "react";

interface Props {
    order: IOrder;
}

export const OrderCard: FC<Props> = ({ order }) => {
    return (
        <Grid item 
            xs={6} 
            sm={ 4 }
        >
            <Card sx={{ maxWidth: 345 }}>
                {/* <CardHeader
                    title={`${order.placa}`}
                    subheader={ `S/ ${order.total}` }
                />                 */}
                <CardContent>             
                    {/* <Typography gutterBottom variant="h1" component="h2">{ order.placa }</Typography>
                    <Typography gutterBottom variant="h2" component="h2">{ order.placa }</Typography>
                    <Typography gutterBottom variant="h3" component="h2">{ order.placa }</Typography>
                    
                    <Typography gutterBottom variant="subtitle1" component="div">subtitle1</Typography> */}
                    <Typography gutterBottom variant="h4" component="div">{ order.placa }</Typography>
                    <Typography gutterBottom variant="subtitle2" component="div">Servicios</Typography>
                    {/* <Typography gutterBottom variant="body1" component="div">body1</Typography>
                    <Typography gutterBottom variant="body2" component="div">body2</Typography> */}
                    <Stack direction="row" alignItems="center" gap={1}>
                        <ShoppingCartOutlined />
                        <Typography variant="body1">Lavado</Typography>
                    </Stack>                    

                    <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 }, mt:3 }}>
                        <Button color="secondary">
                        Chat
                        </Button>
                        <Button color="primary">
                        Follow
                        </Button>
                    </Box>
                </CardContent>
                <CardActions>
                    {/* <Button size="small" onClick={ () => onAddProduct() }>Agregar</Button>
                    <Button size="small" onClick={ () => onLessProduct() } disabled = { counter < 1 ? true:false }>Quitar</Button> */}
                </CardActions>
            </Card>
      </Grid>
    )
}