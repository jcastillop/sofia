'use client'
import { NextPage } from "next";

import { Chip, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { getSession } from "next-auth/react";

import { IRol, IUser } from "@/interfaces";
import { useUsuarios } from "@/hooks";
import { MainLayout, ResetPasswordDialog, UserDialog } from "@/components";


const UserPage: NextPage = () => {

    const { usuarios, error, isLoading } = useUsuarios()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 2 },
        { field: 'nombre', headerName: 'Nombre', width: 300 },
        { field: 'usuario', headerName: 'Usuario', width: 150 },
        { field: 'correo', headerName: 'Correo', width: 350 },
        { field: 'rol', headerName: 'Rol', width: 150 },
        {
            field: 'estado',
            headerName: 'Estado',
            renderCell: (params: GridRenderCellParams<String>) => {
                return <Chip variant='filled' label="Activo" color="success" />
            }, width: 150
      
        },
        {
            field: 'editar',
            headerName: '',
      
            renderCell: (params: GridRenderCellParams) => {
              const dataUser: IUser = {
                _id     : params.row.id,
                usuario : params.row.usuario,
                nombre  : params.row.nombre,
                rol     : params.row.rol_id,  
                correo  : params.row.correo
              }
                return <UserDialog user={ dataUser } newUser={ false } />
            }, width: 150
      
        },         
        { 
            field: 'rol_id', 
            headerName: 'Contraseña', 
            renderCell: (params: GridRenderCellParams<any>) => {

                const usuario: IUser = {
                    _id     : params.row.rol_id,
                    usuario : params.row.usuario,
                    nombre  : params.row.nombre,
                    rol     : params.row.rol_id,  
                    correo  : params.row.correo
                }

                return  <ResetPasswordDialog user={ usuario } />
            },
            width: 150 
        },
    ]

    const nuevoUsuario: IUser = {
        usuario: "",
        nombre: "",
        correo: ""
    }

    if ( !usuarios ) return (<></>);

    const rows = usuarios.map( (usuarios) => ({
        id          : usuarios._id,
        nombre      : usuarios.nombre,
        usuario     : usuarios.usuario,
        correo      : usuarios.correo,
        rol         : (usuarios.rol as IRol).nombre,
        rol_id      : (usuarios.rol as IRol)._id,
        estado      : usuarios.estado
    }));

    return (
        <>
            <MainLayout title={'Pos - Shop'} pageDescription={'Productos de POS'} imageFullUrl={''}>
                <Typography variant='h1' component = 'h1' sx={{mb:2}}>Mantenimiento de Usuarios</Typography>
                <UserDialog user={ nuevoUsuario } newUser={ true } />
                <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height:700, width: '100%', mt:2}}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 }},
                            columns: {
                            columnVisibilityModel: {
                                hash: false,
                                documento: false,
                            }
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>
                </Grid>

            </MainLayout>        
        </>
        )
}
  
  
export default UserPage
  