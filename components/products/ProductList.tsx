"use client"
import { ICategoria, ICategory, IOrder, IOrderItem, IProducto } from "@/interfaces"
import { Grid } from "@mui/material"
import { FC } from "react"
import { ProductCard } from "./ProductCard";
import { OrderSummary } from "..";
import { useProducts } from "@/hooks";



interface Props {
    category: ICategory;
    order: string;
    orderItems: IOrderItem[];
}

export const ProductList: FC<Props> = ({ category, order, orderItems }) => {

  const { products, isLoadingProduct } = useProducts();

  return (
    <Grid container spacing={1}>

        {
          isLoadingProduct
          ?<></>
          :products.filter(product => (product.categoria as ICategoria ).nombre == category && !orderItems?.some(item => item.producto === product._id)).map( product => (
                <ProductCard product={product} key={product._id} orderId={order} />
          ))
        }
    </Grid>
  )
}
