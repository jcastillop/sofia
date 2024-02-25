import { FC, useRef, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Grid, Typography } from "@mui/material";
import { IOrder, IOrderItem } from "@/interfaces";
import { initialData } from "@/data/seed-data";

export const NewService: FC = () => {
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
            <Button color="secondary" onClick={handleClickOpen} >
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