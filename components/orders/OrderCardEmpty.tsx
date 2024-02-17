import { FC } from "react";
import NextLink from 'next/link';
import { Grid, Card, CardHeader, IconButton, Badge, CardContent, Typography, CardActions, Button, Box, Stack, Link } from "@mui/material";
import { AddCircleOutline, AddBoxRounded } from '@mui/icons-material';

const styles = {
    largeIcon: {
      width: 345,
      height: 60
    },
}

export const OrderCardEmpty: FC = () => {
    return (
        <Grid item
        >
            <NextLink 
                href={`/order/`} 
                aria-disabled={true}
                passHref 
                prefetch={false} 
                legacyBehavior>
                <Link>
                    <Card sx={{ width: 345 }}>
                        <CardContent sx={{ display:"flex", justifyContent:"center"}}>
                            {/* <Button 
                                aria-label="Add"
                                variant="contained"
                                size="large"
                                color="secondary"
                                // sx={{display: "flex", justifyContent: "center", alignItems:"center"}}
                                startIcon={<AddBoxRounded/>}
                            >
                                Nuevo
                            </Button> */}
                        </CardContent>
                    </Card>              
                </Link>
            </NextLink>
          
      </Grid>
    )
}