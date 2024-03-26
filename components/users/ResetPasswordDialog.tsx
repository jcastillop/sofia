import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography}  from '@mui/material/';
import { useForm } from 'react-hook-form';

import { UiContext } from '@/context';
import { IUser } from '@/interfaces';
import { ReiniciarPassword } from '@/hooks';

interface Props{
    user? : IUser;
}

export const ResetPasswordDialog: FC<Props> = ({ user }) => {
    
    const { showAlert } = useContext( UiContext );
    const router = useRouter();

    const { register, reset, handleSubmit, trigger, setValue, getValues, formState: { errors } }  = useForm<IUser>({
        defaultValues: {
            _id: user?._id,
            nombre: user?.nombre,
            usuario: user?.nombre,
            correo: user?.correo
        }
    });

    const onSubmitUser = async (data: IUser) => {
        const id = data._id?data._id:''
        const { hasError, message } = await ReiniciarPassword(id);
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})
        handleClose();
        router.push('/users');   
    }

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button color="secondary" onClick={handleClickOpen} >
            Reiniciar
        </Button>   
     
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={ handleSubmit( onSubmitUser ) }>
            <DialogTitle>{`Reinicio de contraseña`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Esta creiniciando la contraseña del usuario {user?.usuario}. Esta seguro ?
                </DialogContentText>
                <Typography variant="subtitle2"  style={{color: 'blue'}}>
                    Usted no podrá revertir esta operación.
                </Typography>
                
            </DialogContent>
            <DialogActions>
            <Button
                color='success'
                className='circular-btn'
                type='submit'
            >                           
                Confirmar
            </Button>
            <Button 
            onClick={handleClose}
            color='error'
            className='circular-btn'            
            >
                Cancelar
            </Button>
            </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}