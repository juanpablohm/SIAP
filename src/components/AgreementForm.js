import React ,  { useState } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField, Paper, Avatar, CardHeader, IconButton, ListItemIcon} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionSummary, AccordionDetails } from './styles/IntershipFormStyles';
import DatePickerMUI from "./commons/DatePickerMUI";
import SelectInput from '../components/commons/SelectInput';

const AgreementForm=({AgreementFormModel, onSumitFunc, onEdit}) =>{

  const [data, setData] = useState(AgreementFormModel);

  const handledSumit = () =>{ 
        onSumitFunc(data);
  }
 
    return (
            <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
            <Card  elevation={15} >  

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
                               
                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField 
                                      name="secop" 
                                      label="SECOP"
                                      value={data.secop}
                                      onChange={(event) => setData({ ...data,  secop: event.target.value })}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={6} >
                                    <DatePickerMUI 
                                    name="initDateInternship"
                                    label="Fecha de inicio"
                                    value={data.startDate} 
                                    onChange={(newValue) => setData({ ...data, startDate: newValue.toISOString() })}/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={6} >
                                    <DatePickerMUI 
                                    name="endDateInternship"
                                    label="Fecha de terminación"
                                    value={data.endDate} 
                                    onChange={(newValue) => setData({ ...data,  endDate: newValue.toISOString() })}/>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Objeto"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={data.object}
                                        onChange={(event) => setData({ ...data,  object: event.target.value })}
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
                                    value={data.term}
                                    onChange={(event) => setData({ ...data,  term: event.target.value })} 
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
                                  value={data.type}
                                  onChange={(event) => setData({ ...data,  type: event.target.value })} 
                                  fullWidth/>
                              </Grid> 


                              {data.term === "Fija" && (
                                <Grid item xs={12} md={12} lg={12} >
                                  <TextField 
                                    name="secop" 
                                    label="Descripción prorroga"
                                    value={data.extension}
                                    onChange={(event) => setData({ ...data,  extension: event.target.value })}  
                                    fullWidth/>
                                </Grid> 
                             )}  
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
                                        value={data.liquidation}
                                        onChange={(event) => setData({ ...data, liquidation: event.target.value })}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Observaciones"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={data.observations}
                                        onChange={(event) => setData({ ...data, observations: event.target.value })}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField 
                                      name="petitiones" 
                                      label="Nombre encargado del convenio"
                                      value={data.petitioner}
                                      onChange={(event) => setData({ ...data,  petitioner: event.target.value })}  
                                      fullWidth/>
                                </Grid> 
                                                                    
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion> 

                      {onEdit && (              
                        <Accordion >
                          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Documentos anexos</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Grid container spacing={4}>                                
                                <Grid item xs={12} md={12} lg={12} >   
                                      <iframe frameBorder="0" type="text/html" width="100%" height="400px" src={"https://steelheart.tk/file-uploader/index.php?key=SIAP&id=768"} ></iframe>                                                                         
                                </Grid>                                                       
                              </Grid>
                      
                          </AccordionDetails>
                        </Accordion>  
                      )}                         
                    </Box>            
              </CardContent>    

              <Button variant="contained" onClick={handledSumit} sx={{ mt:2, backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>Guardar</Button>
                  
            </Card>              
          </Grid>          
    );
}

export default AgreementForm;