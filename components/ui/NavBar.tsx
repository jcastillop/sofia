"use client"
import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation'
import { LibraryAddRounded } from "@mui/icons-material";

import { OrderContext, UiContext } from "@/context";
import { useContext } from "react";
import { initialData } from "@/data/seed-data";
import { ModalNewOrder } from "..";

export const Navbar = () => {

  const asPath = usePathname()
  const { toggleSideMenu } = useContext( UiContext );
  const { numberOfItems } = useContext( OrderContext );
  
  

  return (
    <AppBar>
        <Toolbar>

            <NextLink href='/' passHref legacyBehavior>
                <Link display={"flex"} alignItems='center'>
                    <Typography variant="h6">{`${initialData.params.company} |`}</Typography>
                    <Typography sx={{ ml:0.5 }}>{`${initialData.params.description}`}</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box sx={{ display: { xs:'none', sm:'block' } }}>
              {
                  initialData.params.pages.filter((page)=>(page.isHomeLink)).map( page => (
                    <NextLink key={page.id} href={page.link} passHref legacyBehavior>
                      <Link>
                        <Button color={ asPath === page.link?'primary':'info' }>{page.name}</Button>
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
