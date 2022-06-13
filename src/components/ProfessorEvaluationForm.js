import React ,  { useState } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField, Paper, Avatar, CardHeader, IconButton, ListItemIcon} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionSummary, AccordionDetails } from './styles/IntershipFormStyles';
import DatePickerMUI from "./commons/DatePickerMUI";
import SelectInput from '../components/commons/SelectInput';
import ProfessorScreen from '../screens/ProfessorScreen';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

const ProfessorEvaluationForm=({MinutaFormModel, Internship, Student,  onSumitFunc}) =>{

  const [data, setData] = useState();

  const handledSumit = () =>{ 
        onSumitFunc(data);
  }
 
    return (
        <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
        <Card  elevation={15} >  

          <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                Evaluación Practica
          </Typography>
          <Divider />
          <CardContent>
              
                <Box>
                  <Accordion >                       
                    <AccordionDetails>
                        <Grid container spacing={4}>
                          <Grid item  xs={12} md={12} lg={12} >
                            <Card  >
                                <CardHeader
                                  avatar={<AssignmentRoundedIcon fontSize="large"/>} 
                                  action={
                                    <IconButton aria-label="settings">
                                      <LaunchRoundedIcon />
                                    </IconButton>
                                  }                      
                                  title={''}
                                  subheader={''}
                                />  
                                              
                              </Card>
                          </Grid>



                          <Grid item xs={12} md={12} lg={12} >
                              <TextField
                                  id="outlined-multiline-flexible"
                                  label="Aspectos positivos del practicante"
                                  multiline
                                  fullWidth
                                  rows={4}
                                  value={''}
                                  onChange={(event) => setData({})}
                              />
                          </Grid>

                          <Grid item xs={12} md={12} lg={12} >
                              <TextField
                                  id="outlined-multiline-flexible"
                                  label="Aspecto por mejorar del practicante"
                                  multiline
                                  fullWidth
                                  rows={4}
                                  value={''}
                                  onChange={(event) => setData({})}
                              />
                          </Grid>

                          <Grid item xs={12} md={12} lg={12} >
                              <TextField
                                  id="outlined-multiline-flexible"
                                  label="Observaciones"
                                  multiline
                                  fullWidth
                                  rows={4}
                                  value={''}
                                  onChange={(event) => setData({})}
                              />
                          </Grid>

                        
    
                        </Grid>                                        
                    </AccordionDetails>
                  </Accordion>

            
                           
                </Box>            
          </CardContent>    

          <Button variant="contained" onClick={handledSumit} sx={{ mt:2, backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>Guardar</Button>
              
        </Card>              
      </Grid>          
    );
}

export default ProfessorEvaluationForm;