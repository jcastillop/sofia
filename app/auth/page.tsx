"use client"
import { signIn } from 'next-auth/react';
import { Box, Grid, Typography, Chip, TextField, Button } from "@mui/material"
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
    username: string,
    password: string
};

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async ({ username, password }, e) => {
        e?.preventDefault()
        const result = await signIn('credentials',{ username, password, redirect: true, callbackUrl: "http://localhost:3000" });
    }

    return(
        <form  onSubmit={ handleSubmit(onSubmit) } noValidate>
        <Box sx={{width:350, padding:'50% 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>FUEL-HUB</Typography>
                    
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        label="Usuario"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }} 
                        fullWidth 
                        { ...register('username', {
                            required: 'Este campo es requerido'
                            
                        })}
                        error={ !!errors.username }
                        helperText={ errors.username?.message }
                    />
                </Grid>                    
                <Grid item xs={12}>
                    <TextField 
                        label='Codigo' 
                        type='password' 
                        InputLabelProps={{ shrink: true }} 
                        variant='outlined' 
                        fullWidth 
                        { ...register('password', {
                            required: 'Este campo es requerido',
                            minLength: { value: 4, message: 'Mínimo 4 caracteres' }
                        })}
                        error={ !!errors.password }
                        helperText={ errors.password?.message }                            
                        />
                </Grid>
                <Grid item xs={12}>
                        <Button
                            type="submit"
                            color="secondary"
                            className='circular-btn'
                            size='large'
                            // disabled = { hasError }
                            fullWidth>
                            Ingresar
                        </Button>
                    </Grid>                    
            </Grid>
        </Box>
        </form>
    )
}

export default LoginPage