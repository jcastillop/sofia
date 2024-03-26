import { FC, useContext, useState } from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem}  from '@mui/material/';
import CreateIcon from '@mui/icons-material/Create';
import { useRouter } from 'next/navigation';

import { IUser } from '@/interfaces';
import { useForm } from 'react-hook-form';
import { UiContext } from '@/context';
import { saveUsuario, updateUsuario, useRols, useUsuarios } from '@/hooks';

interface Props{
    user? : IUser;
    newUser : boolean;
}

export const UserDialog: FC<Props> = ({ user, newUser }) => {

    const router = useRouter();
    const { showAlert } = useContext( UiContext );
    const { mutate } = useUsuarios()
    const { rols, isLoading } = useRols();

    const { register, reset, handleSubmit, trigger, setValue, getValues, formState: { errors } }  = useForm<IUser>({
        defaultValues: {
            _id: user?._id,
            rol: user?.rol as string,
            nombre: user?.nombre,
            usuario: user?.usuario,
            correo: user?.correo,
        }
    });

    const onSubmitUser = async (data: IUser) => {
        const { hasError, message } =  newUser? await saveUsuario(data) : await updateUsuario(data);
        mutate();
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
        {
            newUser? (
                <Button color="secondary" onClick={handleClickOpen} >
                    Nuevo usuario
                </Button>   
            ):(
                <Button color="success" onClick={handleClickOpen} endIcon={<CreateIcon />} >
                    Modificar
                </Button>   
            )
        }
     
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={ handleSubmit( onSubmitUser ) }>
            <DialogTitle>{`${ getValues("_id")==''?'Creación':'Modificación'} de usuarios`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Nombres'}
                            variant='standard' 
                            fullWidth
                            { ...register('nombre', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.nombre }
                            helperText={ errors.nombre?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Usuario'}
                            variant='standard' 
                            fullWidth
                            { ...register('usuario', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.usuario }
                            helperText={ errors.usuario?.message }
                        />
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Correo'}
                            variant='standard' 
                            fullWidth
                            { ...register('correo', {
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.correo }
                            helperText={ errors.correo?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            select
                            label={'Rol'}
                            variant='standard' 
                            fullWidth
                            { ...register('rol')}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.rol }
                            helperText={ errors.rol?.message }
                            defaultValue={ user?.rol }
                        >
                            {
                                isLoading?<></>:
                                rols.map((rol) => (
                                    <MenuItem key={rol._id} value={rol._id}>
                                    {rol.nombre}
                                    </MenuItem>
                                ))
                            }                             
                        </TextField>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
            <Button
                color='success'
                className='circular-btn'
                type='submit'
            >                           
                Guardar usuario
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