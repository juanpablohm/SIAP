import React from "react"
import { Button } from "@mui/material";
import { Paper, Grid } from "@mui/material";
import { Link} from "react-router-dom";

const InternshipScreen = () => {

    return (

        <Grid container  maxWidth="lg" sx={{mt:5, mx:"auto"}}>
            
            <Grid item xs={11} md={11} lg={12} sx={{mx:"auto"}}>
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
              <Grid item xs={12} md={6} lg={4} sx={{p:3, mx:"auto"}}>
                        <Link  style={{ textDecoration: 'none'}}to={"/practicas/nueva"}>
                                    <Button variant="contained" color='primary' size='large' fullWidth>Nueva Practica</Button>
                        </Link>    
              </Grid>
        </Grid>
    );

}

export default InternshipScreen;

