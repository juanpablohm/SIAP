import React ,  { useState } from 'react';
import { Box } from "@mui/system";
import { Grid, Divider,  Button, Card,  TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Accordion, AccordionSummary, AccordionDetails } from './styles/IntershipFormStyles';


const CompanyForm=({CompanyFormModel, onSumitFunc, onEdit}) =>{

  const [data, setData] = useState(CompanyFormModel);

  const handledSumit = () =>{ 
        onSumitFunc(data);
  }
 
    return (
            <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
            <Card  elevation={15} >  

              <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                    Nueva entidad
              </Typography>
              <Divider />
              <CardContent>            
                    <Box>
                    <Accordion >
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                          <Typography>Información de la entidad</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={4}>              
                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField 
                                      name="name" 
                                      label="Nombre de la entidad"
                                      value={data.name}
                                      onChange={(event) => setData({ ...data, name: event.target.value })}  
                                      fullWidth/>
                                </Grid>   

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField 
                                      name="nit" 
                                      label="Nit"
                                      value={data.nit}
                                      onChange={(event) => setData({ ...data,  nit: event.target.value })}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="address" 
                                      label="Dirección"
                                      value={data.address}
                                      onChange={(event) => setData({ ...data, address: event.target.value })}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={6} >
                                    <TextField 
                                      name="phone" 
                                      label="Telefono de contacto"
                                      value={data.phone}
                                      onChange={(event) => setData({ ...data, phone: event.target.value })}  
                                      fullWidth/>
                                </Grid> 

                                <Grid item xs={12} md={12} lg={12} >
                                    <TextField 
                                      name="phone" 
                                      label="Nombre persona de contacto"
                                      value={data.contactName}
                                      onChange={(event) => setData({ ...data, contactName: event.target.value })}  
                                      fullWidth/>
                                </Grid> 
                                
                            </Grid>
                     
                        </AccordionDetails>
                      </Accordion> 
                                   
                      {onEdit && (
                        <Accordion >
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Documentos (Certificado C.C.)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={4}>                                
                                <Grid item xs={12} md={12} lg={12} >   
                                        <iframe frameBorder="0" type="text/html" width="100%" height="400px" src={"https://steelheart.tk/file-uploader/index.php?key=SIAP&id=Entidad" + data.id} ></iframe>                                                                         
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

export default CompanyForm;