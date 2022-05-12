import React ,  { useState, useEffect } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField, Paper, Avatar, CardHeader, IconButton, ListItemIcon, CircularProgress, Alert} from "@mui/material";
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
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { getStudentById } from '../api/student/StudentService';
import { enumEPS } from '../models/student';
import { getAgreementById } from '../api/agreement/AgreementService';

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


const  InternshipForm=({InternshipFormModel, onSumitFunc, labelBtn, studentId, agreementId}) =>{

  const [data, setData] = useState(InternshipFormModel);
  const [student, setStudent] = useState(null);
  const [agreement, setAgreement] = useState(null);
  const [error, setError] = useState(false);


  const getStudent = async () => { 
    try {
      let studentResponse = await getStudentById(studentId); 
      setStudent(studentResponse);    
    }catch(e){
       setError(true);
    }
  };

  const getAgreement = async () => { 
    try {

      let agreementResponse = await getAgreementById(agreementId); 
      if(agreementResponse != null){
        agreementResponse.startDate = agreementResponse.startDate.substring(0, agreementResponse.startDate.indexOf("T"));
        agreementResponse.endDate = agreementResponse.endDate.substring(0, agreementResponse.endDate.indexOf("T"));
        agreementResponse.registeredNumber = agreementResponse.registeredNumber.substring(agreementResponse.registeredNumber.indexOf("-") + 1, );
      }   
      setAgreement(agreementResponse);
    
    }catch(e){
       setError(true);
    }
  }

  useEffect(() => {
    getStudent();
    getAgreement();
  }, [])
  

  const handledSumit = () =>{ 

    let generalGoal = "";
    let specificGoal = "";
   
    data.internship.generalGoal.map((obj) => (generalGoal += obj.desc + ";" ));
    data.internship.specificGoal.map((obj) => (specificGoal += obj.desc + ";" ));
   
    data.internship.generalGoal = generalGoal;
    data.internship.specificGoal = specificGoal;

    data.internship.agreementId = agreementId; 
    data.internship.studentId = studentId;
    onSumitFunc(data);
  }

  
  if(error){
    return ( 
      <Grid item sx={{mt:20, mx:"auto"}} xs={10} md={4} lg={4}> 
             <Typography 
                align="center"
                sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
                  <Alert variant="filled" severity="error">Ocurrio un error, por favor intentelo más tarde!</Alert>
             </Typography>                
      </Grid>
    );
  }
  else if(student == null || agreement == null) {
    return ( 
      <Grid item sx={{mt:20, mx:"auto"}} xs={10} md={9} lg={9}> 
             <Typography 
                align="center"
                sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
                  <CircularProgress/>
             </Typography>                
      </Grid>
    );
  }
 

  return (
            <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
            <Card  elevation={15} >  
            
              <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                    Solicitud de practica
              </Typography>
              <Divider />
              <CardContent>
                   
                    <Box>
                      <Accordion >
                        
                        <AccordionDetails>
                            <Grid container spacing={4}>
                              <Grid item  xs={12} md={6} lg={6} >
                                <Card  >
                                    <CardHeader
                                      avatar={<PersonRoundedIcon fontSize="large"/>}                       
                                      title={student.firstName + " " + student.lastName}
                                      subheader={student.program }
                                    />  
                                    <Divider />                       
                                    <CardContent >
                                      <List sx={{pr:3, pl:3, pt:0 , pb:0}} >
                                        <Grid container  >
                                          <Grid item xs={12} lg={6}>
                                            <ListItem  >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <BadgeRoundedIcon  fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText secondary={student.cedula}/>
                                            </ListItem>
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <ListItem  >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <MedicalServicesRoundedIcon  fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText secondary={enumEPS(student.eps)}/>
                                            </ListItem>                           
                                          </Grid>
                                          <Grid item xs={12} lg={12}>
                                            <ListItem >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <EmailRoundedIcon  fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText secondary={student.email} />
                                            </ListItem>
                                          </Grid>
                                          <Grid item xs={12} lg={12} >
                                            <ListItem >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <SchoolRoundedIcon fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText  secondary={student.university}/>
                                            </ListItem>
                                         </Grid>                                       
                                        </Grid>
                                      </List>
                                    </CardContent>                            
                                  </Card>
                              </Grid>

                              <Grid item  xs={12} md={6} lg={6} >
                                <Card >
                                    <CardHeader
                                      avatar={
                                        <BusinessRoundedIcon fontSize="large" />
                                      }
                                      action={
                                        <IconButton aria-label="settings">
                                          <VisibilityRoundedIcon />
                                        </IconButton>
                                      }
                                      title={agreement.companyName}
                                      subheader={agreement.companyNit + " " + agreement.status}
                                    />
                                    <Divider />                          
                                  
                                    <CardContent >
                                      <List sx={{pr:3, pl:3, pt:2.504 , pb:3}} >
                                        <Grid container  >
                                          <Grid item xs={12} lg={8}>
                                            <ListItem sx={{pr:0}}  >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <DateRangeRoundedIcon  fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText secondary={agreement.startDate + "/" + agreement.endDate}/>
                                            </ListItem>
                                          </Grid>
                                          <Grid item xs={12} lg={4}>
                                            <ListItem  >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <NumbersRoundedIcon  fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText secondary={agreement.registeredNumber}/>
                                            </ListItem>
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <ListItem >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <ChangeCircleRoundedIcon  fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText secondary={agreement.extension} />
                                            </ListItem>
                                          </Grid>
                                          <Grid item xs={12} lg={6} >
                                            <ListItem >
                                              <ListItemIcon sx={{minWidth:'30px'}}>
                                                <StyleRoundedIcon fontSize="small"/>
                                              </ListItemIcon>
                                              <ListItemText  secondary={agreement.type}/>
                                            </ListItem>
                                         </Grid> 

                                                                        
                                        </Grid>
                                      </List>
                                    </CardContent>    
                                                        
                                  </Card>
                              </Grid>  

                              <Grid item xs={12} md={12} lg={12} >
                                  <SelectInput  
                                    name="professor" 
                                    label="Profesor asesor"
                                    options={getProfessor()} 
                                    value={data.internship.professorId}
                                    onChange={(event) => setData({ ...data, internship:{ ...data.internship,  professorId: event.target.value }})} 
                                    fullWidth/>
                              </Grid>                 
                            </Grid>                                        
                        </AccordionDetails>
                      </Accordion>

                    <Accordion >
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">           
                          <Typography >Información de la empresa</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>
                              

                              <Grid item xs={12} md={12} lg={12} >
                                <TextField 
                                name="dependencyCompany" 
                                label="Dependencia donde desarrolla la práctica"
                                value={data.internship.dependency}
                                onChange={(event) => setData({ ...data, internship:{ ...data.internship,  dependency: event.target.value }})}     
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                name="nameOfficer" 
                                label="Nombres del funcionario encargado"  
                                value={data.supervisor.firstName}
                                onChange={(event) => setData({ ...data,  supervisor:{ ...data.supervisor, firstName: event.target.value }})}  
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                name="lastNameOfficer" 
                                label="Apellidos del funcionario encargado"  
                                value={data.supervisor.lastName}
                                onChange={(event) => setData({ ...data, supervisor:{ ...data.supervisor, lastName: event.target.value }})}  
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <TextField 
                                name="positionOfficer" 
                                label="Cargo del funcionario"
                                value={data.supervisor.position}
                                onChange={(event) => setData({ ...data, supervisor:{ ...data.supervisor, position: event.target.value }})}    
                                fullWidth/>
                              </Grid>

                              <Grid item  xs={12} md={12} lg={6} >
                                <TextField 
                                name="cellphoneOfficer" 
                                label="Telefono del funcionario"
                                value={data.supervisor.cellphone}
                                onChange={(event) => setData({ ...data, supervisor:{ ...data.supervisor, cellphone: event.target.value }})}    
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                name="emailOfficer" 
                                label="Email del funcionario"  
                                value={data.supervisor.email}
                                onChange={(event) => setData({ ...data, supervisor:{ ...data.supervisor, email: event.target.value }})}  
                                fullWidth/>
                              </Grid>
                      
                            </Grid>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion >
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                          <Typography>Información de la practica</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput  
                                  name="modality" 
                                  label="Modalidad"
                                  options={getModality()} 
                                  value={data.internship.modality}
                                  onChange={(event) => setData({ ...data, internship:{ ...data.internship, modality: event.target.value }})} 
                                  fullWidth/>
                              </Grid>
                
                              <Grid item xs={12} md={12} lg={4} >
                                <DatePickerMUI 
                                  name="initDateInternship"
                                  label="Fecha de inicio"
                                  value={data.internship.startDate} 
                                  onChange={(newValue) => setData({ ...data, internship:{ ...data.internship, startDate: newValue }})}/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={4} >
                                <DatePickerMUI 
                                  name="endDateInternship"
                                  label="Fecha de terminación"
                                  value={data.internship.endDate} 
                                  onChange={(newValue) => setData({ ...data, internship:{ ...data.internship,endDate: newValue }})}/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={4} >
                                  <Typography sx={{mt:1, textAlign:'center', fontSize: 15 }} color="text.secondary" >
                                      Es remunerada <Checkbox 
                                                    name='isPaid'
                                                    value={data.internship.isPaid} 
                                                    onChange={(event) => setData({ ...data, internship:{ ...data.internship, isPaid: event.target.checked }})}
                                                    defaultChecked />
                                   </Typography>          
                              </Grid>

                              {data.internship.isPaid ? (
                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField 
                                      name="salary" 
                                      label="Salario mensual"
                                      value={data.payment.salary}
                                      onChange={(event) => setData({ ...data, payment:{ ...data.payment, salary: event.target.value }})}  
                                      fullWidth/>
                                </Grid>
                              ):(data.payment.salary=null)}
                              
                              <Grid item xs={12} md={12} lg={12} >                             
                                  <Paper sx={{p:3}}>                                
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={12} lg={2} >
                                        <Typography sx={{textAlign:'center', fontSize: 15 }} color="text.secondary" >
                                                    Horario previsto
                                          </Typography>
                                        </Grid>
                                      
                                        <Grid item xs={12} md={12} lg={5} >
                                            <TimePicker
                                              name="entryTimeInternship"
                                              label="Hora de entrada"
                                              value={data.internship.entryTime} 
                                              onChange={(newValue) => setData({ ...data, internship:{ ...data.internship, entryTime: newValue }})}/>                                 
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={5}>
                                            <TimePicker
                                                name="exitTimeInternship"
                                                label="Hora de salida"
                                                value={data.internship.exitTime} 
                                                onChange={(newValue) => setData({ ...data, internship:{ ...data.internship, exitTime: newValue }})}/>
                                        </Grid>                                   
                                    </Grid>
                                  </Paper>
                              </Grid>           

                            </Grid>

                        </AccordionDetails>
                      </Accordion>


                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Desarrollo de la practica</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>              
                                <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.internship.generalGoal}
                                     model={{
                                        desc  : "",
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, internship:{ ...data.internship, generalGoal: values}})}
                                     title={"Objetivos Generales"}
                                     type={"genObjetives"}/>
                                </Grid> 

                               <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.internship.specificGoal}
                                     model={{
                                        desc  : "",
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, internship:{ ...data.internship, specificGoal: values}})}
                                     title={"Objetivos Especificos"}
                                     type={"speObjetives"}/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.products}
                                     model={{
                                        desc  : "",
                                        date : null,
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, products:values})}
                                     title={"Productos esperados"}
                                     type={"products"}/>
                                </Grid>


                                <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.reports}
                                     model={{
                                        desc  : "",
                                        date : null,
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, reports:values})}
                                     title={"Informes"}
                                     type={"delivery"}/>
                                </Grid>                                 
                            </Grid>
                        </AccordionDetails>
                      </Accordion> 

                     
                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Documentos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container >  

                              <iframe scrolling='no' type="text/html" width="100%" height="100%" src="https://steelheart.tk" ></iframe> 
                                                           
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion>                         
                    </Box>            
              </CardContent>    

              <Button variant="contained" onClick={handledSumit} sx={{ mt:2, backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>{labelBtn}</Button>
                  
            </Card>              
          </Grid>          
    );
}

export default InternshipForm;