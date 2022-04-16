import React from "react"
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Container, Paper, Grid } from "@mui/material";
import { Link, BrowserRouter } from "react-router-dom";
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const PracticeScreen = () => {

    return (

        <Grid container  lg={11} sx={{mt:5, mx:"auto"}}>
            
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={5} sx={{p:3, mx:"auto"}}>
                        <Link  style={{ textDecoration: 'none'}}to={"/practicas/nueva"}>
                                    <Button variant="contained" color='primary' size='large' fullWidth>Nueva Practica</Button>
                        </Link>    
              </Grid>
        </Grid>
    );

}

/* Button variant="contained" color='primary' size='large' >Nueva Practica</Button> */


export default PracticeScreen;

