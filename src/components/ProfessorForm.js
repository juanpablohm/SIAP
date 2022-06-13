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
import {getEPS, getFaculty, getProgram, getUniversity, getModality, getProfessor} from "../api/selectInputs";

const ProfessorForm=({ProfessorFormModel, onSumitFunc}) =>{

  const [data, setData] = useState(ProfessorFormModel);

  const handledSumit = () =>{ 
        onSumitFunc(data);
  }
 
    return (
        <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
        <Card  elevation={15} >  

          <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                Nuevo docente
          </Typography>
          <Divider />
          <CardContent>            
                <Box>
                  <Accordion >                       
                    <AccordionDetails>

                    <Grid container spacing={4}>
                              <Grid item  xs={12} md={6} lg={6} >
                                <TextField 
                                  name="nameStudent" 
                                  label="Nombres"
                                  fullWidth
                                  value={data.name}
                                  onChange={(event) => setData({ ...data, name: event.target.value })}/>
                              </Grid>

                              <Grid item xs={12} md={6} lg={6} >
                                <TextField 
                                  name="lastNameStudent" 
                                  label="Apellidos"
                                  value={data.lastName}
                                  onChange={(event) => setData({ ...data, lastName: event.target.value })}
                                  fullWidth/>
                              </Grid>


                              <Grid item xs={12} md={12} lg={12} >
                                <TextField 
                                  name="documentIdStudent" 
                                  label="Cedula" 
                                  value={data.cedula}
                                  onChange={(event) => setData({ ...data, cedula: event.target.value })}
                                  fullWidth/>
                              </Grid>


                              <Grid item  xs={12} md={12} lg={6} >
                                <TextField 
                                  name="cellphoneStudent" 
                                  label="Telefono"
                                  value={data.cellPhone}
                                  onChange={(event) => setData({ ...data, cellPhone: event.target.value })}  
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                  name="emailStudent" 
                                  label="Email"
                                  value={data.email}
                                  onChange={(event) => setData({ ...data, email: event.target.value})}  
                                  fullWidth/>
                              </Grid>

                                   

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput  
                                  name="facultyStudent" 
                                  label="Facultad"  
                                  options={getFaculty()}
                                  value={data.faculty}
                                  onChange={(event) => setData({ ...data,faculty: event.target.value })}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput  
                                  name="programStudent" 
                                  label="Programa"
                                  options={getProgram()} 
                                  value={data.program}
                                  onChange={(event) => setData({ ...data, program: event.target.value })} 
                                  fullWidth/>
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

export default ProfessorForm;

