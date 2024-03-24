"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem}  from '@mui/material/';
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';

import { ICliente, IProducto } from '@/interfaces';
import { UiContext } from '@/context';
import { saveCliente, saveProduct, updateCliente, updateProduct, useCategorias, useCliente, useClientes, useProducts } from '@/hooks';

import { getSession } from 'next-auth/react';


interface Props{
    cliente? : ICliente;
    newClient : boolean;
}

// TODO: Validaciones del formulario
export const CustomerDialog: FC<Props> = ({ cliente, newClient }) => {

    //const { cliente, isLoading, error } = useCliente(id)

    console.log(cliente)

    const { showAlert } = useContext( UiContext );

    const { mutate } = useClientes();
    
    const { register, handleSubmit, setValue, getValues, formState: { errors } }  = useForm<ICliente>({
        defaultValues: {
            _id: cliente?._id,
            tipo_documento: cliente?.tipo_documento,
            numero_documento: cliente?.numero_documento,
            nombre_comercial: cliente?.nombre_comercial,
            razon_social: cliente?.razon_social,
            ubigeo: cliente?.ubigeo,
            direccion: cliente?.direccion,
            correo: cliente?.correo,
        }
    });

    const onSubmitClient = async (storageClient: ICliente) => {
        const session = await getSession();
        const { hasError, message, cliente } = newClient? await saveCliente(storageClient): await updateCliente(storageClient);
        mutate();
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        handleClose();
    }

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = async () => {   
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        {
            newClient? (
                <Button color="secondary" onClick={handleClickOpen} sx={{mb:'20px'}} >
                    Nuevo cliente
                </Button>   
            ):(
                <Button color="success" onClick={handleClickOpen} endIcon={<CreateIcon />} >
                    Modificar
                </Button>   
            )
        }
     
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={ handleSubmit( onSubmitClient ) }>
            <DialogTitle>{`${ newClient?'Creación':'Modificación'} de cliente`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1}}>
                <Grid item xs={12} sm={12}>
                        <TextField 
                            label={'Razon social'}
                            variant='standard' 
                            fullWidth
                            { ...register('razon_social', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.razon_social }
                            helperText={ errors.razon_social?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            label={'Nombre comercial'}
                            variant='standard' 
                            fullWidth
                            { ...register('nombre_comercial', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.nombre_comercial }
                            helperText={ errors.nombre_comercial?.message }
                        />
                    </Grid>                                        
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            label={'Direccion'}
                            variant='standard' 
                            fullWidth
                            { ...register('direccion', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.direccion }
                            helperText={ errors.direccion?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            label={'Correo'}
                            variant='standard' 
                            fullWidth
                            { ...register('correo', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.correo }
                            helperText={ errors.correo?.message }
                        />
                    </Grid>                                                
                </Grid>

            </DialogContent>
            <DialogActions>
            <Button
                color='success'
                className='circular-btn'
                type='submit'
            >                           
                Guardar cliente
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