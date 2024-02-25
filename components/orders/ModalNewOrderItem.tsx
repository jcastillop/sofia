import { FC, useRef, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Grid, Typography, IconButton } from "@mui/material";
import { IOrder, IOrderItem } from "@/interfaces";
import { initialData } from "@/data/seed-data";
import { AddCircle } from "@mui/icons-material";
import { OrderList } from ".";

export const ModalNewOrderItem: FC = () => {
    const inputRef  = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [placa, setPlaca] = useState("")
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddService = ( value:string ) => {
        console.log(placa + "-" + value)
        const orserService: IOrder = {
            orderItems: [],
            placa: placa + "-" + value,
            numberOfItems: 0,
            subTotal: 0,
            tax: 0,
            total: 0,
            isPaid: false,
            state: 0
        }
        setOpen(false);
    }
    
    return(
        <>
            <IconButton sx={{ color:'green'}} onClick={ handleClickOpen }>
                <AddCircle />
            </IconButton>        
            <Dialog
                open={open}
                onClose={handleClose}
                disableRestoreFocus={true}
            >
                <DialogTitle>Productos/Servicios</DialogTitle>
                <DialogContent sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <OrderList orders={ initialData.orders } />
                </DialogContent>
            </Dialog>              
        </>
    )
}