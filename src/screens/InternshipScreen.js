import React from "react"
import { Button } from "@mui/material";
import { Grid, Box} from "@mui/material";
import { Link} from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { cardHeaderStyles } from './styles/cardHeaderStyles';

const InternshipScreen = () => {

    const handleChange = (value) => {
      console.log(value);
    };

    return (

        <Grid container  maxWidth="md" sx={{mt:5, mx:"auto"}}>

          <Grid item xs={11} md={10} lg={12} sx={{mx:"auto"}}>
              <Card >
                  <Box sx={cardHeaderStyles.wrapper}>
                        <SearchBar 
                            placeholder="Buscar por cedula estudiante"
                            onChange={(event) => handleChange(event.target.value)}
                            searchBarWidth='300px'
                        />
                  </Box>
                 
                  <CardContent>
                    <Typography 
                        align="center"
                        sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                    >
                        No se ha encontrado ninguna practica
                    </Typography>
                  </CardContent>


              </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{p:3, mx:"auto"}}>
                  <Link  style={{ textDecoration: 'none'}}to={"/practicas/nueva"}>
                              <Button variant="contained" color='primary' size='large' fullWidth>Nueva Practica</Button>
                  </Link>    
          </Grid> 
        </Grid>
    );

}



export default InternshipScreen;

