import React ,  { useState } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField, Paper, Avatar, CardHeader, IconButton, ListItemIcon} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionSummary, AccordionDetails } from './styles/IntershipFormStyles';
import DatePickerMUI from "./commons/DatePickerMUI";
import SelectInput from '../components/commons/SelectInput';
import {getEPS, getFaculty, getProgram, getUniversity, getModality, getProfessor} from "../api/selectInputs";
import TimePicker from './commons/TimePicker';
import Checkbox from '@mui/material/Checkbox';
import {v4 as uuidv4} from "uuid";
import DinamicInput from './commons/DynamicInput';
import UploadButton from './commons/FileInput';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

var Student = {
  firstName : 'Juan Pablo',
  lastName: 'Hernández Molina',
  documentId: '1053873928',
  dateBirth: '2014-08-18T21:11:54',
  cellphone: '',
  email: 'juan.1701711246@ucaldas.edu.co',
  eps: 'Colsanitas',
  university: 'Universidad de Caldas',
  faculty: '',
  program: 'Ingenieria de Sistemas',
  code: '1701711246',
};

var Agreement = {
  entity: 'Universidad de Caldas',
  nit: '1234567-9',
  type:'Marco',
  prorogation: 'Automatico',
  startDate: '11/03/22',
  endDate: '11/03/25',
  status: 'Activo',
  consecutive: '303'
};

const  MinutaForm=({MinutaFormModel, Internship, Student,  onSumitFunc,}) =>{

  const [data, setData] = useState(MinutaFormModel);
  
  const handledSumit = () =>{ 
      onSumitFunc(data);
  }

  return (
            <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
            <Card  elevation={15} >  

              <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                    Minuta
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
                                      title={Internship.studentName + "(C.C." + Internship.studentCédula +") - " +  Internship.companyName }
                                      subheader={Student.universityName +" - " + Student.program }
                                    />  
                                                  
                                  </Card>
                              </Grid>

                            
         
                            </Grid>                                        
                        </AccordionDetails>
                      </Accordion>
 
                
                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Información financiera</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>              
                                <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="cdp" 
                                      label="Número de CDP"
                                      value={data.cdp}
                                      onChange={(event) => setData({...data, cdp: event.target.value })}  
                                      fullWidth/>
                                </Grid>   

                                 <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="arl" 
                                      label="Codigo contrato ARL"
                                      value={data.arlCode}
                                      onChange={(event) => setData({...data, arlCode: event.target.value })}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="compromise" 
                                      label="Número compromiso presupuestal"
                                      value={data.budgetCommitment}
                                      onChange={(event) => setData({...data, budgetCommitment: event.target.value  })}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={3} >
                                  
                                    <Typography sx={{textAlign:'center', mt:2, fontSize: 15 }} color="text.secondary" >
                                                    Periodo academico 
                                    </Typography> 
                                 
                                
                                </Grid>   

                                <Grid item xs={12} md={12} lg={3} >
                                    <RadioGroup
                                          row
                                          sx={{width:"150px", mt:1}}
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                          value={data.period}
                                          onChange={(event) => setData({...data, period: event.target.value })}
                                        >
                                          <FormControlLabel value="Primer Periodo" control={<Radio />} label="I" />
                                          <FormControlLabel value="Segundo Periodo" control={<Radio />} label="II" />
                                    </RadioGroup>
                                </Grid>                                
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion> 

                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Información adicional</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>              
                                                           
                              <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.observations}
                                     model={{
                                        description  : "",
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, observations:values})}
                                     title={"Notas"}
                                     type={"genObjetives"}/>
                                </Grid> 

                                                                    
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion> 

                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Documentos (CDP, compromiso presupuestal, etc. )</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>                                
                              <Grid item xs={12} md={12} lg={12} >   
                                    <iframe frameBorder="0" type="text/html" width="100%" height="400px" src={"https://steelheart.tk/file-uploader/index.php?key=SIAP&id=" + data.id} ></iframe>                                                                         
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

export default MinutaForm;