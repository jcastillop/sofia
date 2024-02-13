import { IOrder } from "@/interfaces";
import { Grid } from "@mui/material";
import { FC } from "react";
import { OrderCard } from ".";

interface Props {
    orders: IOrder[];
}

export const OrderList: FC<Props> = ({ orders }) => {

  return (
    <Grid container spacing={4}>
        {
            orders.map( order => (
                <OrderCard 
                    key={ order.uid }
                    order={ order }
                />
            ))
        }
    </Grid>
  )
}
