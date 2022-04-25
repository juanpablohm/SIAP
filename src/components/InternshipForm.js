import React ,  { useState } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField, Paper} from "@mui/material";
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

const Student = {
    name : '',
    lastName: '',
    documentId: '',
    dateBirth: '2014-08-18T21:11:54',
    cellphone: '',
    email: '',
    eps: 'Sura',
    university: '',
    faculty: '',
    program: '',
};

const Officer = {

   name: '',
   lastName: '',
   cellphone: '',
   email: '',
   position: ''

};

const Internship = {
   dependency:'',
   modality: '',
   initDate: '2014-08-18T21:11:54',
   endDate: '2014-08-18T21:11:54',
   entryTime: null,
   exitTime: null,
   weeksHour: '',
   isPaid: '',
   genObjetives: [
          {
            desc  : "",
            id: uuidv4(),
          },
        ],
   speObjetives: [
          {
            desc  : "",
            id: uuidv4(),
          },
        ],
   proffesor: '',
};

const Reports = [{
  desc  : "Primer informe de actividades",
  id: uuidv4(),
  date: null
},
{
  desc  : "Segundo informe de actividades",
  id: uuidv4(),
  date: null
},
{
  desc  : "Informe final de actividades",
  id: uuidv4(),
  date: null
},
{
  desc  : "Concertación de objetivos",
  id: uuidv4(),
  date: null
}]

const Products = [ {
  desc  : "",
  id: uuidv4(),
  date: null
}];


const Payment = {
  cdp : '',
  total: '',
  pays: [{
    desc : '',
    id: uuidv4(),
    date: null
  }]
}

const Files = {
    cdp: null, 
    arl: null
}

const InternshipFormModel = {
  "student": Student,
  "officer": Officer,
  "internship" : Internship,
  "payment":Payment,
  "report": Reports,
  "products": Products,
  "files": Files
}



const  InternshipForm=({InternshipFormModel, onSumitFunc, labelBtn}) =>{

  const [data, setData] = useState(InternshipFormModel);


  const handledSumit = () =>{      
        onSumitFunc(data);
  }
 
    return (
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
                                <TextField 
                                  name="nameStudent" 
                                  label="Nombres"
                                  fullWidth
                                  value={data.student.name}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student, name: event.target.value }})}/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <TextField 
                                  name="lastNameStudent" 
                                  label="Apellidos"
                                  value={data.student.lastName}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student, lastName: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                  name="documentIdStudent" 
                                  label="Cedula" 
                                  value={data.student.documentId}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,documentId: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <DatePickerMUI 
                                  name="dateBirthStudent"
                                  label="Fecha de nacimiento"
                                  value={data.student.dateBirth} 
                                  onChange={(newValue) => setData({ ...data, student:{ ...data.student, dateBirth: newValue }})}/>
                              </Grid>

                              <Grid item  xs={12} md={12} lg={6} >
                                <TextField 
                                  name="cellphoneStudent" 
                                  label="Telefono"
                                  value={data.student.cellphone}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,cellphone: event.target.value }})}  
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                  name="emailStudent" 
                                  label="Email"
                                  value={data.student.email}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,email: event.target.value} })}  
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput 
                                  name="epsStudent"
                                  label="EPS" 
                                  value={data.student.eps}
                                  options={getEPS()}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,eps: event.target.value }})} 
                                  helper=""/>
                              </Grid>               

                              <Grid item xs={12} md={12} lg={12} >
                                <SelectInput  
                                  name="universityStudent" 
                                  label="Universidad"
                                  options={getUniversity()} 
                                  value={data.student.university}                    
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,university: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <SelectInput  
                                  name="facultyStudent" 
                                  label="Facultad"  
                                  options={getFaculty()}
                                  value={data.student.faculty}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,faculty: event.target.value }})}
                                  fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <SelectInput  
                                  name="programStudent" 
                                  label="Programa"
                                  options={getProgram()} 
                                  value={data.student.program}
                                  onChange={(event) => setData({ ...data, student:{ ...data.student,program: event.target.value }})} 
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
                              <Grid item  xs={12} md={12} lg={12} >
                                <TextField 
                                name="nameCompany" 
                                label="Nombre de la empresa" 
                                value={data.company.name} 
                                fullWidth/>
                              </Grid>

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
                                value={data.officer.name}
                                onChange={(event) => setData({ ...data,  officer:{ ...data.officer, name: event.target.value }})}  
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                name="lastNameOfficer" 
                                label="Apellidos del funcionario encargado"  
                                value={data.officer.lastName}
                                onChange={(event) => setData({ ...data, officer:{ ...data.officer, lastName: event.target.value }})}  
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={12} >
                                <TextField 
                                name="positionOfficer" 
                                label="Cargo del funcionario"
                                value={data.officer.position}
                                onChange={(event) => setData({ ...data, officer:{ ...data.officer, position: event.target.value }})}    
                                fullWidth/>
                              </Grid>

                              <Grid item  xs={12} md={12} lg={6} >
                                <TextField 
                                name="cellphoneOfficer" 
                                label="Telefono del funcionario"
                                value={data.officer.cellphone}
                                onChange={(event) => setData({ ...data, officer:{ ...data.officer, cellphone: event.target.value }})}    
                                fullWidth/>
                              </Grid>

                              <Grid item xs={12} md={12} lg={6} >
                                <TextField 
                                name="emailOfficer" 
                                label="Email del funcionario"  
                                value={data.officer.email}
                                onChange={(event) => setData({ ...data, officer:{ ...data.officer, email: event.target.value }})}  
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
                                  value={data.internship.initDate} 
                                  onChange={(newValue) => setData({ ...data, internship:{ ...data.internship, initDate: newValue }})}/>
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

                              <Grid item xs={12} md={12} lg={12} >
                                  <SelectInput  
                                    name="professor" 
                                    label="Profesor asesor"
                                    options={getProfessor()} 
                                    value={data.professor.id}
                                    onChange={(event) => setData({ ...data, professor:{ ...data.professor, id: event.target.value }})} 
                                    fullWidth/>
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
                                     values={data.internship.genObjetives}
                                     model={{
                                        desc  : "",
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, internship:{ ...data.internship, genObjetives: values}})}
                                     title={"Objetivos Generales"}
                                     type={"genObjetives"}/>
                                </Grid> 

                               <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.internship.speObjetives}
                                     model={{
                                        desc  : "",
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, internship:{ ...data.internship, speObjetives: values}})}
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
                                     values={data.report}
                                     model={{
                                        desc  : "",
                                        date : null,
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data, report:values})}
                                     title={"Informes"}
                                     type={"delivery"}/>
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
                                      label="Numero de CDP"
                                      value={data.payment.cdp}
                                      onChange={(event) => setData({ ...data, payment:{ ...data.payment, cdp: event.target.value }})}  
                                      fullWidth/>
                                </Grid>   

                                 <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="total" 
                                      label="Total asignado"
                                      value={data.payment.total}
                                      onChange={(event) => setData({ ...data, payment:{ ...data.payment, total: event.target.value }})}  
                                      fullWidth/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >               
                                  <DinamicInput 
                                     values={data.payment.pays}
                                     model={{
                                        desc  : '',
                                        date : null,
                                        id: uuidv4()
                                     }} 
                                     setFunction={(values) => setData({ ...data,  payment:{ ...data.payment, pays:values}})}
                                     title={"Pagos"}
                                     type={"pay"}/>
                                </Grid>                            
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion> 

                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Documentos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>  

                             <Grid item xs={6} md={6} lg={6} >   
                                <UploadButton 
                                  file={data.files.cdp}
                                  label = {"CDP"}                           
                                  onChange={(e) => { setData({ ...data,  files:{ ...data.files, cdp: e.target.files[0] }}) }}      
                                />
                             </Grid>

                              <Grid item xs={6} md={6} lg={6} >   
                                <UploadButton 
                                  file={data.files.arl}
                                  label = {"arl"}
                                  onChange={(e) => { setData({ ...data, files:{ ...data.files, arl: e.target.files[0] }}) }}      
                                />
                              </Grid>
                                                           
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