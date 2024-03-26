import { FC, useContext, useState } from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography}  from '@mui/material/';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { UiContext } from '@/context';
import { CambiarPassword } from '@/hooks';

export const ChangePasswordDialog = ({ }) => {
    
    
    const { showAlert } = useContext( UiContext );
    const { data: session, status } = useSession()

    type FormData = {
        password: string;
    }

    const { register, reset, handleSubmit, trigger, setValue, getValues, formState: { errors } }  = useForm<FormData>({
        defaultValues: {
            password: ''
        }
    });

    const onSubmitUser = async (data: FormData) => {
        const id = session?session.user.id:""
        const { hasError, message } = await CambiarPassword(id, data.password);
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})
        handleClose();
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
            Cambiar
        </Button>   
     
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={ handleSubmit( onSubmitUser ) }>
            <DialogTitle>{`Cambio de contraseña`}</DialogTitle>
            <DialogContent>
                <TextField 
                    label={'Contraseña'}
                    type='password' 
                    variant='standard' 
                    fullWidth
                    { ...register('password', {
                        required: 'Este campo es requerido'
                        
                    })}
                    InputLabelProps={{ shrink: true }}
                    error={ !!errors.password }
                    helperText={ errors.password?.message }
                />
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