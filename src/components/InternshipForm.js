import React from 'react';
import { Button, Card } from "@mui/material";
import { Box } from "@mui/system";
import { Container, Paper, Grid } from "@mui/material";
import { Link, BrowserRouter } from "react-router-dom";
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';


const Accordion = styled((props) => (
  <MuiAccordion defaultExpanded disableGutters elevation={15} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },color:"white", marginTop: "15px"
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' , color:"white"}} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:"#1976d2",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  color: "black"
}));

const  InternshipForm=() =>{

    return (
            <Grid container maxWidth="lg" sx={{mt:5, mx:"auto"}}>

              <Grid item xs={12} md={12} lg={12} sx={{ml:3}}>
                <Link to={"/practicas"} style={{ textDecoration: 'none'}}>
                  <IconButton aria-label="delete" >
                          <ChevronLeftIcon fontSize="large" />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item sx={{mt:1, mx:"auto"}} xs={11} md={9} lg={9}>
                <Card  elevation={15} >                          
                  <CardContent>
                      <Typography  sx={{mb:2, fontWeight: 600}} component="h5" variant="h5" align="center">
                        Solicitud de practica
                      </Typography>
                      <Divider sx={{mb:2}} />
                      <Accordion >
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">              
                          <Typography >Información personal</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
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
                          <Typography>Documentos de soporte</Typography>
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
                      <Divider sx={{mb:2}} />
                      <Button variant="contained" sx={{backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>Enviar</Button>
                                   
                  </CardContent>
              
                </Card>              
              </Grid>           
            </Grid>    
    );
}

export default InternshipForm;