"use client"
import { FC, useContext, useRef, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Grid, Typography } from "@mui/material";

import { UiContext } from "@/context";
import { saveOrder } from "@/hooks";
import { IOrder } from "@/interfaces";


export const ModalNewOrder: FC = () => {
    const inputRef  = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [placa, setPlaca] = useState("")
    const { showAlert } = useContext( UiContext );
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddService = async( value:string ) => {
        const session = await getSession()
        console.log(session)
        const orderService: IOrder = {
            codigo: placa + "-" + value,
            fecha: new Date(),
            subTotal: 0,
            igv: 0,
            total: 0,
            comentario: '',
            isPaid: false,
            numeroitems: 0,
            orderitems: [],
            usuario: session?.user.id||""
        }
        const { hasError, message, orden } = await saveOrder(orderService)

        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        handleClose();
        setOpen(false);
    }
    
    return(
        <>
            <Button color="secondary" onClick={handleClickOpen} sx={{ mb: '20px' }}>
                Nuevo servicio
            </Button>         
            <Dialog
                open={open}
                onClose={handleClose}
                disableRestoreFocus={true}
            >
                <DialogTitle>Ingrese la placa del vehículo</DialogTitle>
                <DialogContent sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <Grid container spacing={0} sx={{ width: 150}}>
                        <Grid item xs={12} sm={12} sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                            <TextField
                                onChange={(e)=>{
                                    const { value } = e.target
                                    if(value.length==3 && inputRef.current){
                                        setPlaca(value)
                                        inputRef.current.focus()
                                    }
                                }}
                                autoFocus={true}
                                margin="dense"
                                id="txtPlacaSerie"
                                name="serie"
                                type="text"
                                fullWidth
                                variant="outlined"
                                inputProps={{ style: { textTransform: "uppercase", fontSize:30, padding:5 }, maxLength: 3 }}
                            />
                            <Typography variant='h1' component='h1'>-</Typography>
                            <TextField
                                onChange={(e)=>{
                                    const { value } = e.target
                                    if(value.length==3){
                                        handleAddService(value)
                                    }
                                }}
                                inputRef={inputRef} 
                                margin="dense"
                                id="txtPlacaNumero"
                                name="numero"
                                type="text"
                                fullWidth
                                variant="outlined"
                                inputProps={{ style: { textTransform: "uppercase", fontSize:30, padding:5}, maxLength: 3 }}
                            />                             
                        </Grid>                        
                    </Grid>            
                </DialogContent>
            </Dialog>              
        </>
    )
}