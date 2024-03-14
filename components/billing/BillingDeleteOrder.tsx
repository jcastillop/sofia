"use client"
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";

import { UiContext } from "@/context/ui";

export const BillingDeleteOrder: FC = () => {

    const router = useRouter();
    const { showAlert } = useContext( UiContext );
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, reset, handleSubmit, trigger, setValue, getValues, formState: { errors } }  = useForm();

    const onSubmiBillingDelete = () => {
        showAlert({ mensaje: "hola que hace"});
        handleClose();
    }      

    return(
    <>
        <Button color="error" className='circular-btn' fullWidth onClick={handleClickOpen} sx={{mt:2, maxHeight:30, minHeight:30}}>
            Eliminar
        </Button>        

        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={ handleSubmit( onSubmiBillingDelete ) }>
                <DialogTitle>{`Eliminar orden`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Esta eliminando la orden, está seguro?
                    </DialogContentText>
                    <Typography variant="subtitle2"  style={{color: 'blue'}}>
                        ATENCIÓN: Usted no podrá revertir esta operación.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color='success' className='circular-btn' type='submit'>Confirmar</Button>
                    <Button onClick={handleClose} color='error' className='circular-btn'>Cancelar</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
    )
}