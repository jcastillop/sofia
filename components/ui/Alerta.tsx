import { FC, useContext, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { UiContext } from "@/context";


export const Alerta: FC = () => {
    
    const { hideAlert, statusAlert, timeAlert, severityAlert, mensajeAlert } = useContext( UiContext );

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        hideAlert();
    };  
    return(
        <Snackbar open={statusAlert} autoHideDuration={timeAlert} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={severityAlert} sx={{ width: '100%' }}>
            {mensajeAlert}
        </Alert>
    </Snackbar>    
    )
}