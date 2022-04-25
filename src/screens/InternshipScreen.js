import React from "react"
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { Grid, Box} from "@mui/material";
import { Link} from "react-router-dom";
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

const Internships = [{
    id : '123',
    student : 'Juan Pablo Hernandez',
    professor: 'Carlos Alberto Ruiz',
    company: 'Universidad de Caldas',
    officer: 'Pedro Perez',
    initDate: '12/08/22',
    endDate: '11/23/23',
    state: 'Aprobada'
}];

const getIconState = (state) =>{

   return(<Chip label={state} color="success"/>)
}

 

const InternshipScreen = () => {

    const handleChange = (value) => {
      console.log(value);
    };

    const noInterships = ()=>{
        return(
        <Typography 
           align="center"
           sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
            No se ha encontrado ninguna practica
        </Typography>)
    }

    return (

        <Grid container  maxWidth="lg" sx={{mt:5, mx:"auto"}}>

          <Grid item xs={11} md={10} lg={12} sx={{mx:"auto"}}>
              <Card >
                  <Grid container sx={cardHeaderStyles.wrapper}>
                        <Grid item  xs={6} lg={9} md={9}>
                          <SearchBar 
                              placeholder="Buscar por cedula estudiante"
                              onChange={(event) => handleChange(event.target.value)}
                              searchBarWidth='300px'
                          />
                        </Grid>
                        <Grid item xs={4} lg={3} md={3}>
                          <Link  style={{ textDecoration: 'none'}}to={"/practicas/nueva"}>
                            <Button startIcon={<AddRoundedIcon  />} variant="contained" color='primary' size='medium' fullWidth>Nueva Practica</Button>
                          </Link> 
                        </Grid> 
                  </Grid>               
                  <CardContent>
            
                  {Internships.length < 1 ? ( 
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
                            {Internships.map((internship) => (
                                <TableRow
                                  key={internship.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                      {getIconState(internship.state)}
                                    </TableCell>
                                    <TableCell align="center">{internship.student}</TableCell>
                                    <TableCell align="center">{internship.professor}</TableCell>
                                    <TableCell align="center">{internship.company}</TableCell>
                                    <TableCell align="center">{internship.officer}</TableCell>
                                    <TableCell align="center">{internship.initDate}</TableCell>
                                    <TableCell align="center">{internship.endDate}</TableCell>
                                    <TableCell align="center">
                                      <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                          <IconButton aria-label="delete" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                                          <IconButton aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>
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

