import React ,  { useState } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField, Paper, Avatar, CardHeader, IconButton, ListItemIcon} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionSummary, AccordionDetails } from './styles/IntershipFormStyles';
import DatePickerMUI from "./commons/DatePickerMUI";
import SelectInput from '../components/commons/SelectInput';
import ProfessorScreen from '../screens/ProfessorScreen';

const SupervisorEvaluationForm=() =>{

  const [data, setData] = useState();

  const handledSumit = () =>{ 
        //onSumitFunc(data);
  }
 
    return (
            <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
            <Card  elevation={15} > 
            holaaa 
{/* 
              <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                    Nuevo Convenio
              </Typography>
              <Divider />
              <CardContent>            
                    <Box>

                    <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Información del convenio</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>              
                                <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="name" 
                                      label="Nombre de la entidad"
                                      value={data.company.name}
                                      onChange={(event) => setData({ ...data, company:{ ...data.company, name: event.target.value }})}  
                                      fullWidth/>
                                </Grid>   

                                <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="nit" 
                                      label="Nit"
                                      value={data.company.nit}
                                      onChange={(event) => setData({ ...data, company:{ ...data.company, nit: event.target.value }})}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={4} >
                                    <TextField 
                                      name="secop" 
                                      label="SECOP"
                                      value={data.agreement.secop}
                                      onChange={(event) => setData({ ...data, agreement:{ ...data.agreement, secop: event.target.value }})}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={4} >
                                    <DatePickerMUI 
                                    name="initDateInternship"
                                    label="Fecha de inicio"
                                    value={data.agreement.startDate} 
                                    onChange={(newValue) => setData({ ...data, agreement:{ ...data.agreement, startDate: newValue.toISOString() }})}/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={4} >
                                    <DatePickerMUI 
                                    name="endDateInternship"
                                    label="Fecha de terminación"
                                    value={data.agreement.endDate} 
                                    onChange={(newValue) => setData({ ...data, agreement:{ ...data.agreement, endDate: newValue.toISOString() }})}/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Objeto"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={data.agreement.object}
                                        onChange={(event) => setData({ ...data, agreement:{ ...data.agreement, object: event.target.value }})}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={6} >
                                  <SelectInput  
                                    name="prorroga" 
                                    label="Prorroga"
                                    options={ [  {
                                        value: 'Automatica',
                                        label: 'Automatica',
                                      },
                                      {
                                        value: 'Fija',
                                        label: 'Fija',
                                      },
                                      {
                                        value: 'Sin prorroga',
                                        label: 'Sin prorroga',
                                      }]} 
                                    value={data.agreement.extension}
                                    onChange={(event) => setData({ ...data, agreement:{ ...data.agreement,  extension: event.target.value }})} 
                                    fullWidth/>
                              </Grid> 


                               <Grid item xs={12} md={12} lg={6} >
                                  <SelectInput  
                                    name="type" 
                                    label="Tipo"
                                    options={[{
                                        value: 'Marco',
                                        label: 'Marco',
                                      },
                                      {
                                        value: 'Privado',
                                        label: 'Privado',
                                      },
                                      {
                                        value: 'Publico',
                                        label: 'Publico',
                                      }]}                   
                                    value={data.agreement.type}
                                    onChange={(event) => setData({ ...data, agreement:{ ...data.agreement,  type: event.target.value }})} 
                                    fullWidth/>
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
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Cuantia"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={data.agreement.liquidation}
                                        onChange={(event) => setData({ ...data, agreement:{ ...data.agreement, liquidation: event.target.value }})}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Observaciones"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={data.agreement.observations}
                                        onChange={(event) => setData({ ...data, agreement:{ ...data.agreement, observations: event.target.value }})}
                                    />
                                </Grid>
                                                                    
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion> 

                      <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Documentos (Certificado C.C.)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>                                
                              <Grid item xs={12} md={12} lg={12} >   
                                    <iframe frameBorder="0" type="text/html" width="100%" height="400px" src={"https://steelheart.tk/file-uploader/index.php?key=SIAP&id=768"} ></iframe>                                                                         
                              </Grid>                                                       
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion>                         
                    </Box>            
              </CardContent>    

              <Button variant="contained" onClick={handledSumit} sx={{ mt:2, backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>Crear</Button>
                   */}
            </Card>              
          </Grid>          
    );
}

export default SupervisorEvaluationForm;