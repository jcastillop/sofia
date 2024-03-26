"use client"
import { useContext } from "react";
import NextLink from "next/link";
import { usePathname } from 'next/navigation'
import { AppBar, Badge, Box, Button, Link, Toolbar, Typography } from "@mui/material";

import { UiContext } from "@/context";
import { useParametros } from "@/hooks";

export const Navbar = () => {

  const asPath = usePathname()
  const { toggleSideMenu } = useContext( UiContext );
  const { error, isLoading, parametros } = useParametros()

  if(!parametros) return (<></>)
  
  return (
    <AppBar>
        <Toolbar>

            <NextLink href='/' passHref legacyBehavior>
                <Link display={"flex"} alignItems='center'>
                    <Typography variant="h6">{`${parametros.company} |`}</Typography>
                    <Typography sx={{ ml:0.5 }}>{`${parametros.descripcion}`}</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box sx={{ display: { xs:'none', sm:'block' } }}>
              {
                  parametros.paginas.filter((page)=>(page.ishomelink)).map( page => (
                    <NextLink key={page._id} href={page.link} passHref legacyBehavior>
                      <Link>
                        <Button color={ asPath === page.link?'primary':'info' }>{page.nombre}</Button>
                      </Link>
                    </NextLink>     
                  ) )
              } 
            </Box>
            
            <Box flex={1}/>
            
            <Box>
              {/* <NextLink href="/neworder" passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
              </NextLink> */}
            </Box>

            <Button onClick={ toggleSideMenu }>
              Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
