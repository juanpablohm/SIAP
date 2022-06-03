import React, { useEffect, useState } from "react"
import { Alert, Button, ButtonGroup, CircularProgress, IconButton } from "@mui/material";
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
import { getStudents } from "../api/student/StudentService";
import { enumEPS } from '../models/student';


const StudentScreen = () => {

    let navigate = useNavigate();

    const [students, setStudents] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState(students);

    const getStudentsData = async () => { 
      try {
        let StudentResponse = await getStudents(); 

        console.log(StudentResponse);
        setStudents(StudentResponse);   
        setSearch(StudentResponse);
      }catch(e){
        setError(true);
      }
    };

    useEffect(() => {
        getStudentsData();
    }, []);

    const handleSearch = (value) => {
      
      const lowercasedValue = value.toLowerCase().trim();

      console.log(search);

      if(lowercasedValue === '') setStudents(search);
      else {
        const filteredData = students.filter((item) => {
            return Object.keys(item).some((key) => 
                  item[key]?.toString().toLowerCase().trim().includes(lowercasedValue)
            );
        });
        if(filteredData.length >= 1)
            setStudents(filteredData);
      }
    };

    const handledEdit = (id) => {
        navigate('/estudiante/editar/' + id);
    }


    const handledRemove = async (id) => {
       console.log("borrar" + id);
      /*  try {
        let internshipResponse = await deleteInternshipById(id); 
        getInternshipsData();
      }catch(e){
        setError(true);
      } */
    }

    const noStudents = ()=>{
        return(
        <Typography 
           align="center"
           sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
            No se ha encontrado ningún estudiante
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
    else if(students == null) {
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
                              placeholder="Buscar por cedula, nombre, universidad "
                              onChange={(event) => handleSearch(event.target.value)}
                              searchBarWidth='300px'
                          />
                        </Grid>
                        <Grid item xs={4} lg={3} md={3}>
                          <Link  style={{ textDecoration: 'none'}} to={"/convenios/nuevo"} >
                            <Button startIcon={<AddRoundedIcon  />} variant="contained" color='primary' size='medium' fullWidth>Nuevo Practicante</Button>
                          </Link> 
                        </Grid> 
                  </Grid>               
                  <CardContent>
            
                  {students.length < 1 ? ( 
                        noStudents()
                  ) : (
                      <TableContainer component={Paper}>
                        <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead sx={{backgroundColor:'#212121', color:'white'}}>
                            <TableRow >
                              <TableCell sx={{color:'white'}} align="center">Cedula</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Nombre</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Email</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Programa</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Universidad</TableCell>
                              <TableCell sx={{color:'white'}} align="center">EPS</TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {students.map((student) => (
                                <TableRow
                                  key={student.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                   
                                    <TableCell align="center">{student.cedula}</TableCell>
                                    <TableCell align="center">{student.firstName + " " + student.lastName}</TableCell>
                                    <TableCell align="center">{student.email}</TableCell>
                                    <TableCell align="center">{student.program}</TableCell>
                                    <TableCell align="center">{student.universityName}</TableCell>
                                    <TableCell align="center">{enumEPS(student.eps)}</TableCell>
                                    <TableCell align="center">
                                      <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                          <IconButton onClick={() => {handledEdit(student.id)}}  aria-label="delete" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                                          <IconButton onClick={() => {handledRemove(student.id)}} aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>                        
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

        </Grid>
    );
}

export default StudentScreen;

