"use client"
import { ICategory, IOrderItem, IProduct } from "@/interfaces"
import { Grid } from "@mui/material"
import { FC } from "react"
import { ProductCard } from "./ProductCard";
import { OrderSummary } from "..";



interface Props {
    products: IProduct[];
    category: ICategory;
    orderitems?: IOrderItem[];
}

export const ProductList: FC<Props> = ({ products, category, orderitems }) => {

  return (
    <Grid container spacing={1}>
        {
            products.filter(product => product.category == category && !orderitems?.some(order => order.uid === product.uid)).map( product => (
                <ProductCard product={product} key={product.uid}/>
            ) )
        }
    </Grid>
  )
}
