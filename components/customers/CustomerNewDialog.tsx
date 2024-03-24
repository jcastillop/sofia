"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem}  from '@mui/material/';
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';

import { ICliente, IProducto } from '@/interfaces';
import { UiContext } from '@/context';
import { saveProduct, updateProduct, useCategorias, useCliente, useProducts } from '@/hooks';

import { getSession } from 'next-auth/react';


interface Props{
    newProduct : boolean;
}

// TODO: Validaciones del formulario
export const CustomerNewDialog: FC<Props> = ({ newProduct }) => {

    const { showAlert } = useContext( UiContext );
    
    const { register, handleSubmit, setValue, getValues, formState: { errors } }  = useForm<ICliente>({
        defaultValues: {
            tipo_documento: 0,
            numero_documento: '',
            nombre_comercial: '',
            razon_social: '',
            ubigeo: '',
            direccion: '',
            correo: ''
        }
    });

    const onSubmitClient = async (storageClient: ICliente) => {
        const session = await getSession();

        // const { hasError, message, producto } = newProduct? await savecL(storageProducto): await updateProduct(storageProducto);
        // mutate();
        // showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        // handleClose();
        //window.location.href = "/products"
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
            newProduct? (
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
            <DialogTitle>{`${ newProduct?'Creación':'Modificación'} de cliente`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Descripcion'}
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