import React from 'react';
import { Box } from "@mui/system";
import { Grid, Divider, IconButton, Button, Card, Input, TextField} from "@mui/material";
import { Link} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionSummary, AccordionDetails } from './styles/IntershipFormStyles';


const  InternshipForm=() =>{

    return (
            <Grid container maxWidth="lg" sx={{mt:5, mb:5, mx:"auto"}}>

              <Grid item xs={12} md={12} lg={12} sx={{ml:3}}>
                <Link to={"/practicas"} style={{ textDecoration: 'none'}}>
                  <IconButton aria-label="delete" >
                          <ChevronLeftIcon fontSize="large" />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item sx={{mt:1, mx:"auto"}} xs={11} md={9} lg={9}>
                <Card  elevation={15} >  

                  <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                        Solicitud de practica
                  </Typography>
                  <Divider />
                  <CardContent>

                      <Box>
                        <Accordion >
                          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">              
                            <Typography >Información personal</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Grid container spacing={4}>
                                <Grid item  xs={12} md={12} lg={12} >
                                  <TextField id="nombre" label="Nombres"  fullWidth/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                  <TextField id="nombre" label="Apellidos"  fullWidth/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                  <TextField id="nombre" label="Cedula"  fullWidth/>
                                </Grid>

                                <Grid item  xs={12} md={12} lg={6} >
                                  <TextField id="nombre" label="Telefono"  fullWidth/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={6} >
                                  <TextField id="nombre" label="Email"  fullWidth/>
                                </Grid>
                              </Grid>
                                
                           
                          </AccordionDetails>
                        </Accordion>

                        <Accordion >
                          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">           
                            <Typography >Información de la empresa</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                              sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                              sit amet blandit leo lobortis eget.
                          </AccordionDetails>
                        </Accordion>

                        <Accordion >
                          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Información de la practica</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                              sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                              sit amet blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion >
                          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Desarrollo de la practica</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                              sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                              sit amet blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>                    
                      </Box>
                  </CardContent>    

                  <Button variant="contained" sx={{ mt:2, backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>Enviar</Button>
                      
                </Card>              
              </Grid>           
            </Grid>    
    );
}

export default InternshipForm;