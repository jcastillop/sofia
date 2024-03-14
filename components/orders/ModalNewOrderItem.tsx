"use client"
import { FC, useRef, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Grid, Typography, IconButton } from "@mui/material";
import { ICategory, IOrder, IOrderItem } from "@/interfaces";
import { initialData } from "@/data/seed-data";
import { AddCircle } from "@mui/icons-material";
import { OrderList } from ".";
import { ProductList } from "../products/ProductList";
import { useProducts } from "@/hooks";

interface Props {
    category: ICategory;
    order: string;
    orderItems: IOrderItem[];
}

export const ModalNewOrderItem: FC<Props> = ({ category, order, orderItems }) => {
    
    const [open, setOpen] = useState(false);
        
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <>
            <IconButton sx={{ color:'green'}} onClick={ handleClickOpen }>
                <AddCircle />
            </IconButton>        
            <Dialog
                open={open}
                onClose={handleClose}
                disableRestoreFocus={true}
                fullWidth
            >
                <DialogTitle>Productos/Servicios</DialogTitle>
                <DialogContent sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <ProductList category={category} order={order} orderItems={orderItems}/>
                </DialogContent>
            </Dialog>              
        </>
    )
}