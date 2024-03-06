"use client"
import { OrderContext, UiContext } from '@/context';
import { saveOrderItem, useOrder } from '@/hooks';
import { ICategoria, IOrderItem, IProducto } from '@/interfaces';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import React, { FC, useContext } from 'react'

interface Props {
    product: IProducto;
    orderId: string;
}


export const ProductCard: FC<Props> = ({ product, orderId }) => {

    const { showAlert } = useContext( UiContext );
    const onAddProduct = async () => {
        const orderItem: IOrderItem = {
            nombre: product.nombre,
            categoria: (product.categoria as ICategoria) ? (product.categoria as ICategoria).nombre! : "",
            codigo: product.codigo,
            codigo_sunat: product.codigo_sunat,
            descuento: product.descuento,
            descripcion: product.descripcion,
            precio_unitario: product.precio_unitario,
            valor_unitario: product.valor_unitario,
            unidad_medida: product.unidad_medida,
            precio_total: product.precio_unitario,
            valor_total: product.valor_unitario,
            igv: product.valor_unitario * Number(process.env.NEXT_PUBLIC_TAX_RATE),
            igv_total: product.valor_unitario * Number(process.env.NEXT_PUBLIC_TAX_RATE),
            cantidad: 1
        }

        const producto : string = product._id!
        const { hasError, message} = await saveOrderItem(orderId, producto, orderItem);
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
    }

    return (
        <Grid item xs={3} sm={3}>
            <Card>
                <CardActionArea>
                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={ 'https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" srcset="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=150 150w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300 300w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=400 400w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600 600w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800 800w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200 1200w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600 1600w' }
                        alt={ product.nombre }
                        width={500}
                        onClick={ onAddProduct }
                    />
                </CardActionArea>
            </Card>
            <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700}>{ product.nombre }</Typography>
              <Typography fontWeight={500}>{ `$${product.precio_unitario}` }</Typography>
          </Box>
        </Grid>
    )
}
