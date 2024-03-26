
'use client'
import { MainLayout } from "@/components";
import { ChangePasswordDialog } from "@/components/users/ChangePasswordDialog";
import { IUser } from "@/interfaces";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

const PerfilPage: NextPage = () => {

    const { data: session, status } = useSession()
    
    return(
        <>
            <MainLayout title={'Pos - Shop'} pageDescription={'Productos de POS'} imageFullUrl={''}>
                <Typography variant='h1' component = 'h1' sx={{mb:2}}>Mi Perfil</Typography>
                <Typography variant='h2' sx={{ mb: '10px' }}>Datos de su perfil y cambio de contraseña</Typography>

                <Grid item xs={ 3 } sm={ 3 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Detalle</Typography>
                            <Divider sx={{ my:1 }} />                            
                            <Grid container spacing={2} sx={{ mt: 1}}>
                                <Grid item xs={6} sm={3}>Usuario:</Grid>
                                <Grid item xs={6} sm={3}>{ session?.user.usuario }</Grid>
                                <Grid item xs={6} sm={3}>Nombres:</Grid>
                                <Grid item xs={6} sm={3}>{ session?.user.nombre }</Grid>            

                                <Grid item xs={6} sm={3}>Correo:</Grid>
                                <Grid item xs={6} sm={3}>{ session?.user.correo }</Grid>
                                <Grid item xs={6} sm={3}>Rol:</Grid>
                                <Grid item xs={6} sm={3}>{ session?.user.rol?.nombre }</Grid>         

                                <Grid item xs={6} sm={3}>Empresa:</Grid>
                                <Grid item xs={6} sm={3}>{ session?.user.empresa?.razon_social }</Grid> 
                                <Grid item xs={6} sm={3}>Cambiar contraseña:</Grid>
                                <Grid item xs={6} sm={3}><ChangePasswordDialog /></Grid>                                                                                                                                                 
                            </Grid>
                        </CardContent>
                    </Card>
                    
                </Grid>

            </MainLayout>             
        </>
    )
}
  
export default PerfilPage