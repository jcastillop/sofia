"use client"
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem}  from '@mui/material/';
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';

import { ICategoria, IProducto } from '@/interfaces';
import { UiContext } from '@/context';
import { saveProduct, updateProduct, useCategorias, useProducts } from '@/hooks';
import { Constantes } from '@/helpers';
import variables from '@/helpers/variables';
import { getSession, useSession } from 'next-auth/react';
import { mutate } from 'swr';

interface Props{
    product? : IProducto;
    newProduct : boolean;
}

// TODO: Validaciones del formulario
export const ProductDialog: FC<Props> = ({ product, newProduct }) => {

    const { showAlert } = useContext( UiContext );

    const { categorias, isLoadingCategoria } = useCategorias();

    const { mutate } = useProducts();
    
    const { register, handleSubmit, setValue, getValues, formState: { errors } }  = useForm<IProducto>({
        defaultValues: {
            _id: product?._id,
            nombre: product?.nombre,
            categoria: (product?.categoria as ICategoria)._id,
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
        mutate();
        showAlert({mensaje: message, severity: hasError? 'error':'success', time: 1500})  
        handleClose();
        //window.location.href = "/products"
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
            <DialogTitle>{`${ getValues("_id")?'Modificación':'Creación'} de productos`}</DialogTitle>
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
                            select
                            label={'Categoría'}
                            variant='standard'
                            fullWidth
                            //defaultValue={ }
                            { ...register('categoria')}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors.categoria }
                            helperText={ errors.categoria?.message }
                            defaultValue={ (product?.categoria as ICategoria)._id }
                        >
                            {
                                isLoadingCategoria?<></>:
                                categorias.map((categoria) => (
                                    <MenuItem key={categoria._id} value={categoria._id}>
                                    {categoria.nombre}
                                    </MenuItem>
                                ))
                            }   
                        </TextField>                        
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