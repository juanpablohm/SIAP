import React ,  { useState } from 'react';
import { Grid, Divider,  Button, Card,  TextField, Paper, RadioGroup, FormControlLabel, Radio, Checkbox} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { setDate } from 'date-fns';


const SupervisorEvaluationForm=({ evaluationForm, questionsSupervisor, onSumitFunc}) =>{

  const [data, setData] = useState(evaluationForm);

  const handledSumit = () =>{ 
        onSumitFunc(data);
  }

  const handleChangeInputs = (id, newValue) => {
		const index =  data.supervisorResponses.findIndex((m) => m.supervisorQuestionId === id)
    data.supervisorResponses[index]['grade'] = newValue;
    let newData =  data.supervisorResponses; 
		setData({ ...data, supervisorResponses: newData})
    
	} 

  const handleGetInputs = (id) => {
		const index = data.supervisorResponses.findIndex((m) => m.supervisorQuestionId === id)
		return data.supervisorResponses[index]['grade'] 
	} 
 
    return (
        <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
        <Card  elevation={15} >  

          <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                Evaluación Desempeño
          </Typography>
          <Divider />

          <Typography  sx={{color:'#111111', mb:0, mt:3, fontSize:"0.85rem", fontWeight: 50}}  align="center">
          Por favor, evalúe al estudiante a su cargo en una escala de 1 a 5, donde 1 es la calificación más baja y 5 la más alta, N/A. no aplica.
          </Typography>
          

          <CardContent sx={{p:5}}>             
                        <Grid container spacing={4}>
                          <Grid item  xs={12} md={12} lg={12} >
                                <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">                    
                                  <TableBody>

                                  {questionsSupervisor.map((category) => (  
                                    <>
                                      <TableRow key={category.id} sx={{mb:3}} >        
                                          <TableCell  sx={{color:"white", backgroundColor:"#3d5afe", mb:0, mt:0, fontWeight: 600}} align="center">{category.categoryName}</TableCell>
                                      </TableRow>
                                      {category.supervisorQuestions.map((question) => (  
                                        <TableRow  key={question.id}>
                                          <TableCell sx={{p:1}} >                                               
                                                <Table size="small" aria-label="purchases">                  
                                                  <TableBody>
                                                    <TableRow >     
                                                        <TableCell  sx={{ width:"60%", m:0, pt:3, pb:0, border:"0px", fontWeight: 200}} align="center">{question.description}</TableCell>                                      
                                                        <TableCell  sx={{m:0, pt:0, pb:0, border:"0px"}}>
                                                          <RadioGroup sx={{m:0}}
                                                              row
                                                              aria-labelledby="demo-controlled-radio-buttons-group"
                                                              name="controlled-radio-buttons-group"
                                                              value={handleGetInputs(question.id)}
                                                              onChange={(event) => {handleChangeInputs(question.id, event.target.value )}}
                                                            >
                                                              <FormControlLabel sx={{m:0}} labelPlacement="top" value="0" control={<Radio size="small" />} label="0" />
                                                              <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="1" control={<Radio size="small"/>} label="1" />
                                                              <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="2" control={<Radio size="small"/>} label="2" />
                                                              <FormControlLabel sx={{m:0}}  labelPlacement="top"  value="3" control={<Radio size="small"/>} label="3" />
                                                              <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="4" control={<Radio size="small"/>} label="4" />
                                                              <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="5" control={<Radio size="small"/>} label="5" />
                                                              <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="N/A" control={<Radio size="small"/>} label="N/A" />
                                                            </RadioGroup>                       
                                                        </TableCell> 
                                                    </TableRow>                                                                                               
                                                  </TableBody>
                                                </Table>                                   
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </>
                                  ))}
                                
                                   

                                  </TableBody>
                                </Table>
                              </TableContainer>

                          </Grid>

                          <Grid item xs={12} md={12} lg={12} >
                                  <Typography sx={{mt:1, textAlign:'center', fontSize: 15 }} color="text.secondary" >
                                      Volvería a trabajar con el estudiante en un futuro <Checkbox 
                                                    name='isPaid'
                                                    value={data.willWork} 
                                                    onChange={(event) => setData({...data, willWork: event.target.checked})}
                                                     />
                                   </Typography>          
                          </Grid>

                        
                          <Grid item xs={12} md={12} lg={12} >
                              <TextField
                                  id="outlined-multiline-flexible"
                                  label="Observaciones"
                                  multiline
                                  fullWidth
                                  rows={4}
                                  value={data.observations}
                                  onChange={(event) => setData({...data, observations: event.target.value})}
                              />
                          </Grid>

                        
    
                        </Grid>                                        
            

            
                           
          </CardContent>    

          <Button variant="contained" onClick={handledSumit} sx={{ mt:2, backgroundColor:"#000000", "&:hover":{backgroundColor:"#151515"}}}  size='large' fullWidth>Guardar</Button>
              
        </Card>              
      </Grid>          
    );
}

export default SupervisorEvaluationForm;