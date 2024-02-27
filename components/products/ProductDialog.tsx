"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem}  from '@mui/material/';
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';

import { IProduct } from '@/interfaces';
import { UiContext } from '@/context';
import { saveProduct, updateProduct } from '@/hooks';
import { Constantes } from '@/helpers';

interface Props{
    product? : IProduct;
    newProduct : boolean;
}

export const ProductDialog: FC<Props> = ({ product, newProduct }) => {

    const { showAlert } = useContext( UiContext );
    
    const { register, handleSubmit, setValue, getValues, formState: { errors } }  = useForm<IProduct>({
        defaultValues: {
            uid: product?.uid,
            name: product?.name,
            category: product?.category,
            code: product?.code,
            sunat_code: product?.sunat_code,
            discount: product?.discount,
            description: product?.description,
            unit_price: product?.unit_price,
            unit_value: product?.unit_value,
            unit_measure: product?.unit_measure,
        }
    });

    const onSubmitUser = async (storageProducto: IProduct) => {
        const { hasError, message, producto } = newProduct? await saveProduct(storageProducto): await updateProduct(storageProducto);
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        handleClose();
        window.location.href = "/products"
    }

    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEfectivoValueChange = (event: { target: { value: any; }; }) => {
        const newEfectivoValue = +event.target.value
        setValue("unit_value", +((newEfectivoValue/1.18).toFixed(2)), { shouldValidate: true });
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
            <DialogTitle>{`${ getValues("uid")?'Creación':'Modificación'} de productos`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Nombre'}
                            variant='standard' 
                            fullWidth
                            { ...register('name', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Descripcion'}
                            variant='standard' 
                            fullWidth
                            { ...register('description', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Categoría'}
                            variant='standard' 
                            fullWidth
                            { ...register('category', {
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.category }
                            helperText={ errors.category?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Codigo'}
                            variant='standard' 
                            fullWidth
                            { ...register('code', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.code }
                            helperText={ errors.code?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Sunat'}
                            variant='standard' 
                            fullWidth
                            { ...register('sunat_code', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.sunat_code }
                            helperText={ errors.code?.message }
                        />
                    </Grid>                    
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            label={'Descuento'}
                            variant='standard' 
                            fullWidth
                            { ...register('discount', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.discount }
                            helperText={ errors.discount?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            label={'Unidad medida'}
                            variant='standard' 
                            fullWidth
                            { ...register('unit_measure', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.unit_measure }
                            helperText={ errors.unit_measure?.message }
                        />
                    </Grid>                       
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Descripción'}
                            variant='standard' 
                            fullWidth
                            { ...register('description', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />
                    </Grid>                      
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Precio unitario'}
                            variant='standard' 
                            fullWidth
                            { ...register('unit_price', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.unit_price }
                            helperText={ errors.unit_price?.message }
                            onChange={handleEfectivoValueChange}
                        />
                    </Grid>  
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label={'Valor unitario'}
                            variant='standard' 
                            fullWidth
                            { ...register('unit_value', {
                                required: 'Este campo es requerido'
                                
                            })}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.unit_value }
                            helperText={ errors.unit_value?.message }
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