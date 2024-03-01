"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem}  from '@mui/material/';
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';

import { IProducto } from '@/interfaces';
import { UiContext } from '@/context';
import { saveProduct, updateProduct } from '@/hooks';
import { Constantes } from '@/helpers';
import variables from '@/helpers/variables';
import { getSession, useSession } from 'next-auth/react';

interface Props{
    product? : IProducto;
    newProduct : boolean;
}

export const ProductDialog: FC<Props> = ({ product, newProduct }) => {

    const { showAlert } = useContext( UiContext );
    
    const { register, handleSubmit, setValue, getValues, formState: { errors } }  = useForm<IProducto>({
        defaultValues: {
            uid: product?.uid,
            nombre: product?.nombre,
            categoria: product?.categoria,
            codigo: product?.codigo,
            codigo_sunat: product?.codigo_sunat,
            descuento: product?.descuento,
            descripcion: product?.descripcion,
            precio_unitario: product?.precio_unitario,
            valor_unitario: product?.valor_unitario,
            unidad_medida: product?.unidad_medida,
        }
    });

    const onSubmitUser = async (storageProducto: IProducto) => {
        const session = await getSession();
        const { hasError, message, producto } = newProduct? await saveProduct(storageProducto): await updateProduct(storageProducto);
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        handleClose();
        window.location.href = "/products"
    }

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = async () => {    
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEfectivoValueChange = (event: { target: { value: any; }; }) => {
        const newEfectivoValue = +event.target.value
        setValue("valor_unitario", +((newEfectivoValue/1.18).toFixed(2)), { shouldValidate: true });
    };      

    // const isDecimalValid = () => {
    //     const arr = getValues("valor").toString().split(".")
    //     if(arr.length != 2) return true;
    //     const decimales = arr[1].length
    //     if(getValues("medida") == Constantes.GALONES){
    //         return decimales == 10? true: `El cantidad de decimales es incorrecta para ${getValues("medida")}, la cantidad requerida es 10, vuelva a escribir el precio`
    //     }else{
    //         return decimales == 2? true: `El cantidad de decimales es incorrecta para ${getValues("medida")}, la cantidad requerida es 2, vuelva a escribir el precio`
    //     }
    // };

    return (
        <div>
        {
            newProduct? (
                <Button color="secondary" onClick={handleClickOpen} sx={{mb:'20px'}} >
                    Nuevo producto
                </Button>   
            ):(
                <Button color="success" onClick={handleClickOpen} endIcon={<CreateIcon />} >
                    Modificar
                </Button>   
            )
        }
     
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={ handleSubmit( onSubmitUser ) }>
            <DialogTitle>{`${ getValues("uid")?'Modificación':'Creación'} de productos`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Nombre'}
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
                            label={'Descripcion'}
                            variant='standard' 
                            fullWidth
                            { ...register('descripcion', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.descripcion }
                            helperText={ errors.descripcion?.message }
                        />
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Categoría'}
                            variant='standard' 
                            fullWidth
                            { ...register('categoria', {
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.categoria }
                            helperText={ errors.categoria?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Codigo'}
                            variant='standard' 
                            fullWidth
                            { ...register('codigo', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.codigo }
                            helperText={ errors.codigo?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Sunat'}
                            variant='standard' 
                            fullWidth
                            { ...register('codigo_sunat', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.codigo_sunat }
                            helperText={ errors.codigo_sunat?.message }
                        />
                    </Grid>                    
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            label={'Descuento'}
                            variant='standard' 
                            fullWidth
                            { ...register('descuento', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.descuento }
                            helperText={ errors.descuento?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            label={'Unidad medida'}
                            variant='standard' 
                            fullWidth
                            { ...register('unidad_medida', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.unidad_medida }
                            helperText={ errors.unidad_medida?.message }
                        />
                    </Grid>                                           
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Precio unitario'}
                            variant='standard' 
                            fullWidth
                            { ...register('precio_unitario', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.precio_unitario }
                            helperText={ errors.precio_unitario?.message }
                            onChange={handleEfectivoValueChange}
                        />
                    </Grid>  
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Valor unitario'}
                            variant='standard' 
                            fullWidth
                            { ...register('valor_unitario', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.valor_unitario }
                            helperText={ errors.valor_unitario?.message }
                            disabled
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
                Guardar producto
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