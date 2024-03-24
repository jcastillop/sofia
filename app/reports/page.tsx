'use client'
import { NextPage } from "next";
import { Button, Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { Storefront, ExpandLess, ExpandMore, PunchClock, PeopleAlt, Summarize, Book } from "@mui/icons-material";
import { useState } from "react";
import { CierreTurnos, DeclaracionMensual, MainLayout, UsuariosAtencion, Ventas } from "@/components";



interface IReporte {
    tipo: 'ventas'|'declaracion_mensual'|'cierres'|'usuarios_atencion'
}

const ReportsPage: NextPage = () => {

    const [tipoReporte, setTipoReporte] = useState<IReporte>({tipo: 'ventas'});

    const [open, setOpen] = useState(false);

    const [openContable, setOpenContable] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickContable = () => {
        setOpenContable(!openContable);
    };    

    const renderSwitch = ({ tipo }: IReporte) => {
        switch(tipo) {
            case 'ventas':
                return <>
                    <Ventas/>
                </>
            case 'declaracion_mensual':
                return <>
                    <DeclaracionMensual/>
                </>
            case 'cierres':
                return <>
                    <CierreTurnos/>
                </>
            case 'usuarios_atencion':
                return <>
                    <UsuariosAtencion/>
                </> 
            default:
                return <>
                    <Ventas/>
                </>                       
        }
    }


    return(
        <>
            <MainLayout title={'Pos - Shop'} pageDescription={'Productos de POS'} imageFullUrl={''}>
                <Typography variant='h1' component = 'h1' sx={{mb:2}}>Reportes</Typography>

                <Grid container  spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            Seleccione
                            </ListSubheader>
                        }
                        >
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                <Storefront />
                                </ListItemIcon>
                                <ListItemText primary="Ventas" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    
                                    <ListItemButton sx={{ pl: 4 }} onClick={ ()=> {setTipoReporte({ tipo: 'ventas'})} }>
                                        <ListItemText primary="Detalle de ventas" />
                                    </ListItemButton>

                                    <ListItemButton sx={{ pl: 4 }} onClick={ ()=> {setTipoReporte({ tipo: 'cierres'})} }>
                                        <ListItemText primary="Cierres de turno" />
                                    </ListItemButton>

                                    <ListItemButton sx={{ pl: 4 }} onClick={ ()=> {setTipoReporte({ tipo: 'usuarios_atencion'})} }>
                                        <ListItemText primary="Usuarios atencion" />
                                    </ListItemButton>                                    
                                                       
                                </List>
                            </Collapse>

                            <ListItemButton onClick={handleClickContable}>
                                <ListItemIcon>
                                <Book />
                                </ListItemIcon>
                                <ListItemText primary="Contables" />
                                {openContable ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openContable} timeout="auto" unmountOnExit>
                                <ListItemButton sx={{ pl: 4 }} onClick={ ()=> {setTipoReporte({ tipo: 'declaracion_mensual'})} }>
                                    <ListItemText primary="Declaracion mensual" />
                                </ListItemButton>  
                            </Collapse>

                        </List>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        { renderSwitch( tipoReporte ) }
                    </Grid>
                </Grid>
            </MainLayout>             
        </>
    )
}

export default ReportsPage