import { FC, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Typography } from '@mui/material';

import { saveCierre } from '@/hooks';
import { getDatetimeFormat } from '@/helpers';
import { UiContext } from '@/context';

interface Props{

}

export const CierreDialog: FC<Props> = () => {

    const { data: session, status } = useSession()

    const { showAlert } = useContext( UiContext );
    
    const [isOpenDialog, setOpenDialog] = useState(false);

    const [isOpenDate, setOpenDate] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
  
    const handleClose = () => {
        setOpenDialog(false);
    };   

    function toggle() {
        setOpenDate((isOpenDate) => !isOpenDate);
    }    

    const handleAceptar = async () => {
        const { hasError, message, cierre } =  await saveCierre(session?.user.id?session?.user.id:'', new Date())
        if(hasError){
            showAlert({mensaje: message, severity: 'error'})
        }else{
            showAlert({mensaje: `Turno cerrado satisfactoriamente`, severity: 'success'})                                
        }        
    }

    return (
        <div>
            {/* <PrintCierre {...{horaIngreso, totalGalones, totales, gastos, depositos}} ref={componentRef} /> */}
            <Button color="secondary" onClick={handleClickOpen} >
                CERRAR TURNO
            </Button>    

            <Dialog open={isOpenDialog} onClose={handleClose}>
            <DialogTitle>
                <Typography>Cierre de turno</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta cerrando su turno con fecha <Link href="#"  onClick={toggle}>{getDatetimeFormat(new Date())}</Link>. Esta seguro ?
                </DialogContentText>
                <Typography variant="subtitle2"  style={{color: 'blue'}}>
                    Usted no podrá revertir esta operación.
                </Typography>         
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}  color="error">Cancelar</Button>
            <Button onClick={handleAceptar} color="success">Aceptar</Button>
            </DialogActions>
        </Dialog>               
        </div>
    );
}