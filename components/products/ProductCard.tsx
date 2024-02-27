"use client"
import { OrderContext } from '@/context';
import { IOrderItem, IProduct } from '@/interfaces';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import React, { FC, useContext } from 'react'

interface Props {
    product: IProduct;
}


export const ProductCard: FC<Props> = ({ product }) => {

    const { addItemToOrder } = useContext(OrderContext);

    const onAddProduct = () => {
        const orderItem: IOrderItem = {
            uid: product.uid,
            name: product.name,
            category: product.category,
            code: product.code,
            sunat_code: product.sunat_code,
            discount: product.discount,
            description: product.description,
            unit_price: product.unit_price,
            unit_value: product.unit_value,
            unit_measure: product.unit_measure,
            tot_price: product.unit_price,
            tot_value: product.unit_value,
            total: product.unit_price,
            quantity: 1
        }
        addItemToOrder(orderItem)
    }

    return (
        <Grid item xs={3} sm={3}>
            <Card>
                <CardActionArea>
                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={ 'https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" srcset="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=150 150w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300 300w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=400 400w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600 600w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800 800w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200 1200w, https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600 1600w' }
                        alt={ product.name }
                        width={500}
                        onClick={ onAddProduct }
                    />
                </CardActionArea>
            </Card>
            <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700}>{ product.name }</Typography>
              <Typography fontWeight={500}>{ `$${product.unit_price}` }</Typography>
          </Box>
        </Grid>
    )
}
