import { IOrder } from "@/interfaces";
import { Grid } from "@mui/material";
import { FC } from "react";
import { OrderCard, OrderCardEmpty } from ".";

interface Props {
    orders: IOrder[];
}

export const OrderList: FC<Props> = ({ orders }) => {

  return (
    <Grid container spacing={3}>
        {
            orders.map( order => (
                <OrderCard 
                    key={ order._id }
                    order={ order }
                />
            ))
        }        
    </Grid>
  )
}
