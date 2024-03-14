"use client"
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";

import { UiContext } from "@/context/ui";

interface Props {
    url: string 
}

export const BillingDialogChooseType: FC<Props> = ( { url }) => {

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

    const onSubmiBillingType = () => {
        showAlert({ mensaje: "hola que hace"});
        handleClose();
    }      

    return(
    <>
        <Button color="secondary" className='circular-btn' fullWidth onClick={handleClickOpen} sx={{maxHeight:30, minHeight:30}}>
            Confirmar
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" sx={{ textAlign: "center"}}>
            <form onSubmit={ handleSubmit( onSubmiBillingType) }>
                <DialogTitle>{`Seleccione tipo de comprobante`}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6}>
                            <Button onClick={handleClose} color='secondary' className='circular-big-btn' type='submit'>
                                Boleta rápida
                            </Button>   
                        </Grid> 
                        <Grid item xs={6} sm={6}>
                            <Button color='primary' className='circular-big-btn' href={`/billing/${url}`}>
                            Otro
                            </Button>   
                        </Grid> 
                    </Grid>
                </DialogContent>
                <DialogActions>
              
                </DialogActions>
            </form>
            </Dialog>
    </>
    )
}