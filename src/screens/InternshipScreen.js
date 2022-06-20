import React, { useEffect, useState } from "react"
import { Alert, Button, ButtonGroup, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Grid, Box} from "@mui/material";
import { Link, Navigate, useNavigate} from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import SearchBar from "../components/commons/SearchBar";
import { cardHeaderStyles } from './styles/cardHeaderStyles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';
import { getInternships, deleteInternshipById } from "../api/internship/InternshipServices";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { deleteSupervisorById } from "../api/supervisor/SupervisorServices";

const Internships = [{
    id : '123',
    student : 'Juan Pablo Hernandez',
    professor: 'Carlos Alberto Ruiz',
    company: 'Universidad de Caldas',
    officer: 'Pedro Perez',
    initDate: '12/08/22',
    endDate: '11/23/23',
    state: 'Aprobada'
}, {
  id : '1234',
  student : 'Juan Pablo Hernandez',
  professor: 'Carlos Alberto Ruiz',
  company: 'Universidad de Caldas',
  officer: 'Pedro Perez',
  initDate: '12/08/22',
  endDate: '11/23/23',
  state: 'Aprobada'
}];

const isEvaluation = (status, type) =>{
  /* if(type === 1){
    if(status >= 6)
        return true;
  }
  return false; */
  return true;
};

const isMinuta = (status, type, minutaId) => {
  
  if(minutaId != 0){

    if(type === 1){
        if(status >= 2)
          return true;
    }else{
        if(status >= 1)
          return true;
    }

  }
  return false;

};

const getIconState = (status, type) =>{

   let state = { label:"Creada" , color:'default'}

   //1 practicas externas
   //0 practicas internas

   if(type === 1){

    switch (status) {
      case 1:
        state.label = "A. Docente";
        state.color = "info";
        break;
 
      case 2:
        state.label = "A. Comite";
        state.color = "warning";
        break;
 
      case 3:
         state.label = "A. Administrativo";
         state.color = "secondary";
         break;
 
      case 4:
           state.label = "A. C. Practicas";
           state.color = "primary"
           break;
 
      case 5:
         state.label = "En curso";
         state.color = "success";
         break;

      case 5:
          state.label = "Terminada";
          state.color = "error";
          break;
 
      default:
        break;
    }

   }else{
      
    switch (status) {
      case 1:
        state.label = "A. Administrativo";
        state.color = "secondary";
        break;
 
      case 2:
        state.label = "A. C. Practicas";
        state.color = "primary";
        break;
 
      case 3:
         state.label = "A. Costos";
         state.color = "info";
         break;
 
      case 4:
           state.label = "En curso";
           state.color = "success";
           break;
 
      case 5:
         state.label = "Terminada";
         state.color = "error";
         break;
 
      default:
        break;
    }

  }

   return(<Chip sx={{width:'100%'}}  label={state.label} color={state.color}/>)
}

const InternshipScreen = () => {

    let navigate = useNavigate();

    const [internships, setInternships] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState(internships);

    const getInternshipsData = async () => { 
      try {
        let internshipResponse = await getInternships(); 
        setInternships(internshipResponse);   
        setSearch(internshipResponse);
      }catch(e){
        setError(true);
      }
    };

    useEffect(() => {
      getInternshipsData();
    }, []);

    const handleSearch = (value) => {
      
      const lowercasedValue = value.toLowerCase().trim();

      console.log(search);

      if(lowercasedValue === '') setInternships(search);
      else {
        const filteredData = internships.filter((item) => {
            return Object.keys(item).some((key) => 
                  item[key]?.toString().toLowerCase().trim().includes(lowercasedValue)
            );
        });
        if(filteredData.length >= 1)
          setInternships(filteredData);
      }
    };

    const handledEvaluacion = (id) => {
      navigate('/practicas/evaluacion/' + id);
    }

    const handledEdit = (id) => {
        navigate('/practicas/editar/' + id);
    }

    const handledMinuta = (id) => {
      navigate('/practicas/minuta/' + id);
  }

    const handledRemove = async (id, idSupervisor) => {
       try {     
        let internshipResponse = await deleteInternshipById(id); 
        let supervisorResponse  = await deleteSupervisorById(idSupervisor);
        getInternshipsData();
      }catch(e){
        console.log(e);
        setError(true);
      }
    }

    const noInterships = ()=>{
        return(
        <Typography 
           align="center"
           sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
            No se ha encontrado ninguna practica
        </Typography>)
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
    else if(internships == null) {
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

        <Grid container  maxWidth="lg" sx={{mt:5, mx:"auto"}}>

          <Grid item xs={11} md={10} lg={12} sx={{mx:"auto"}}>
              <Card >
                  <Grid container sx={cardHeaderStyles.wrapper}>
                        <Grid item  xs={6} lg={9} md={9}>
                          <SearchBar 
                              placeholder="Código, cedula, nombre del estudiante"
                              onChange={(event) => handleSearch(event.target.value)}
                              searchBarWidth='300px'
                          />
                        </Grid>
                        <Grid item xs={4} lg={3} md={3}>
                          <Link  style={{ textDecoration: 'none'}} to={"/practicas/convenio/" + 1} >
                            <Button startIcon={<AddRoundedIcon  />} variant="contained" color='primary' size='medium' fullWidth>Nueva Practica</Button>
                          </Link> 
                        </Grid> 
                  </Grid>               
                  <CardContent>
            
                  {internships.length < 1 ? ( 
                        noInterships()
                  ) : (
                      <TableContainer component={Paper}>
                        <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead sx={{backgroundColor:'#212121', color:'white'}}>
                            <TableRow >
                              <TableCell sx={{color:'white'}} align="center">Estado</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Estudiante</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Docente</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Entidad</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Responsable</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Fecha Inicio</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Fecha Fin</TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {internships.map((internship) => (
                                <TableRow
                                  key={internship.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                      {getIconState(internship.status, internship.type)}
                                    </TableCell>
                                    <TableCell align="center">{internship.studentName}</TableCell>
                                    <TableCell align="center">{internship.professorName}</TableCell>
                                    <TableCell align="center">{internship.companyName}</TableCell>
                                    <TableCell align="center">{internship.supervisorName}</TableCell>
                                    <TableCell align="center">{internship.startdate.substring(0, internship.startdate.indexOf("T"))}</TableCell>
                                    <TableCell align="center">{internship.endDate.substring(0, internship.endDate.indexOf("T"))}</TableCell>
                                    <TableCell align="center">
                                      <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                        <Tooltip title="Editar practica">
                                            <IconButton onClick={() => {handledEdit(internship.id)}}  aria-label="delete" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                                          </Tooltip>
                                                                  
                                          {isMinuta(internship.status, internship.type, internship.minutaId) && (
                                            <Tooltip title="Editar minuta">
                                              <IconButton onClick={() => {handledMinuta(internship.id)}} aria-label="delete"  size="small" color="default"> <PlagiarismRoundedIcon /> </IconButton>    
                                            </Tooltip>
                                          )}

                                          {isEvaluation(internship.status, internship.type) && (
                                            <Tooltip title="Evaluación docente">
                                                <IconButton onClick={() => {handledEvaluacion(internship.id)}} aria-label="delete"  size="small" color="default"> <AssignmentTurnedInIcon /> </IconButton>   
                                            </Tooltip>
                                          )}

                                          <Tooltip title="Borrar practica">
                                            <IconButton onClick={() => {handledRemove(internship.id, internship.supervisorId)}} aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>
                                          </Tooltip>
                                          </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </TableContainer>
                  )}

                  </CardContent>
              </Card>
          </Grid>
         {/*  <Grid item xs={12} md={6} lg={4} sx={{p:3, mx:"auto"}}>
                  <Link  style={{ textDecoration: 'none'}}to={"/practicas/nueva"}>
                              <Button variant="contained" color='primary' size='large' fullWidth>Nueva Practica</Button>
                  </Link>    
          </Grid>  */}
        </Grid>
    );

}

export default InternshipScreen;

