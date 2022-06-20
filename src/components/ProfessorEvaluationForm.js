import React ,  { useState } from 'react';
import { Grid, Divider,  Button, Card,  TextField, Paper, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


const ProfessorEvaluationForm=({ Internship, Student, evaluationForm, questionsProfessor, onSumitFunc}) =>{

  const [data, setData] = useState(evaluationForm);

  const handledSumit = () =>{ 
        onSumitFunc(data);
  }


  const handleChangeInputs = (id, newValue) => {
		const index = data.professorResponses.findIndex((m) => m.professorQuestionId === id)
    data.professorResponses[index]['grade'] = newValue;
    let newData = data.professorResponses; 
		setData({ ...data, professorResponses: newData})
    
	} 

  const handleGetInputs = (id) => {
		const index = data.professorResponses.findIndex((m) => m.professorQuestionId === id)
		return data.professorResponses[index]['grade'] 
	}
 
    return (
        <Grid item sx={{mt:1, mx:"auto"}} xs={10} md={9} lg={9}>
        <Card  elevation={15} >  

          <Typography  sx={{color:'#111111', mb:2, mt:3, fontWeight: 600}} component="h5" variant="h5" align="center">
                Evaluación Practica
          </Typography>
          <Divider />

          <Typography  sx={{color:'#111111', mb:0, mt:3, fontWeight: 50}}  align="center">
          Por favor, evalúe al estudiante a su cargo en una escala de 1 a 5, donde 1 es la calificación más baja y 5 la más alta.
          </Typography>
          

          <CardContent sx={{p:5}}>             
                        <Grid container spacing={4}>
                          <Grid item  xs={12} md={12} lg={12} >
                                <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">                    
                                  <TableBody>

                                  {questionsProfessor.map((question) => (  
                                    <>
                                    <TableRow  key={question.id}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>        
                                        <TableCell  sx={{color:"white", backgroundColor:"#3d5afe", mb:2, mt:3, fontWeight: 600}} align="center">{question.evaluationCriteria}</TableCell>
                                    </TableRow>
                                    <TableRow  key={question.id + "100"}>
                                      <TableCell>                                               
                                            <Table size="small" aria-label="purchases">                  
                                              <TableBody>
                                                <TableRow key={question.id + "500"}>     
                                                    <TableCell  sx={{width:"65%", pt:1, pb:0, border:"0px", fontWeight: 200}} align="center">{question.description}</TableCell>                                      
                                                    <TableCell  sx={{pt:1, pb:0, border:"0px"}}>
                                                      <RadioGroup sx={{mb:3}}
                                                          row
                                                          aria-labelledby="demo-controlled-radio-buttons-group"
                                                          name="controlled-radio-buttons-group"
                                                          value={ handleGetInputs(question.id)}
                                                          onChange={(event) => {handleChangeInputs(question.id, event.target.value )}}
                                                        >
                                                          <FormControlLabel sx={{m:0}} labelPlacement="top" value="0" control={<Radio size="small" />} label="0" />
                                                          <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="1" control={<Radio size="small"/>} label="1" />
                                                          <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="2" control={<Radio size="small"/>} label="2" />
                                                          <FormControlLabel sx={{m:0}}  labelPlacement="top"  value="3" control={<Radio size="small"/>} label="3" />
                                                          <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="4" control={<Radio size="small"/>} label="4" />
                                                          <FormControlLabel  sx={{m:0}} labelPlacement="top"  value="5" control={<Radio size="small"/>} label="5" />
                                                        </RadioGroup>                       
                                                    </TableCell> 
                                                </TableRow>                                                                                               
                                              </TableBody>
                                            </Table>                                   
                                      </TableCell>
                                    </TableRow>
                                    </>
                                  ))}

                                  </TableBody>
                                </Table>
                              </TableContainer>

                          </Grid>

                          <Grid item xs={12} md={12} lg={12} >
                              <TextField
                                  id="outlined-multiline-flexible"
                                  label="Aspectos positivos del practicante"
                                  multiline
                                  fullWidth
                                  rows={4}
                                  value={data.positivePoints}
                                  onChange={(event) => setData({...data, positivePoints: event.target.value})}
                              />
                          </Grid>

                          <Grid item xs={12} md={12} lg={12} >
                              <TextField
                                  id="outlined-multiline-flexible"
                                  label="Aspecto por mejorar del practicante"
                                  multiline
                                  fullWidth
                                  rows={4}
                                  value={data.toImprovePoints}
                                  onChange={(event) => setData({...data, toImprovePoints: event.target.value})}
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

export default ProfessorEvaluationForm;