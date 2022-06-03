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
import { getAgreements } from "../api/agreement/AgreementService";

const getIconState = (status) =>{

  let state = { label:"En tramite" , color:'default'}

   switch (status) {
     case 1:
       state.label = "Vigente";
       state.color = "success";
       break;

     case 2:
       state.label = "Anulado";
       state.color = "warning";
       break;
   
     default:
       break;
   }

   return(<Chip sx={{width:'100%'}}  label={state.label} color={state.color}/>)
}

const AgreementScreen = () => {

    let navigate = useNavigate();

    const [agreements, setAgreements] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState(agreements);

    const getAgreementsData = async () => { 
      try {
        let agreementResponse = await getAgreements(); 

        console.log(agreementResponse);
        setAgreements(agreementResponse);   
        setSearch(agreementResponse);
      }catch(e){
        setError(true);
      }
    };

    useEffect(() => {
        getAgreementsData();
    }, []);

    const handleSearch = (value) => {
      
      const lowercasedValue = value.toLowerCase().trim();

      console.log(search);

      if(lowercasedValue === '') setAgreements(search);
      else {
        const filteredData = agreements.filter((item) => {
            return Object.keys(item).some((key) => 
                  item[key]?.toString().toLowerCase().trim().includes(lowercasedValue)
            );
        });
        if(filteredData.length >= 1)
            setAgreements(filteredData);
      }
    };

    const handledEdit = (id) => {
        navigate('/practicas/editar/' + id);
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

    const noAgreements = ()=>{
        return(
        <Typography 
           align="center"
           sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
            No se ha encontrado ningun convenio
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
    else if(agreements == null) {
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
                              placeholder="Buscar por empresa, nit, secop "
                              onChange={(event) => handleSearch(event.target.value)}
                              searchBarWidth='300px'
                          />
                        </Grid>
                        <Grid item xs={4} lg={3} md={3}>
                          <Link  style={{ textDecoration: 'none'}} to={"/convenios/nuevo"} >
                            <Button startIcon={<AddRoundedIcon  />} variant="contained" color='primary' size='medium' fullWidth>Nuevo Convenio</Button>
                          </Link> 
                        </Grid> 
                  </Grid>               
                  <CardContent>
            
                  {agreements.length < 1 ? ( 
                        noAgreements()
                  ) : (
                      <TableContainer component={Paper}>
                        <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead sx={{backgroundColor:'#212121', color:'white'}}>
                            <TableRow >
                              <TableCell sx={{color:'white'}} align="center">Estado</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Empresa</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Nit</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Tipo</TableCell>
                              <TableCell sx={{color:'white'}} align="center">SECOP</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Prorroga</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Fecha Inicio</TableCell>
                              <TableCell sx={{color:'white'}} align="center">Fecha Fin</TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {agreements.map((agreement) => (
                                <TableRow
                                  key={agreement.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                      {getIconState(agreement.status)}
                                    </TableCell>
                                    <TableCell align="center">{agreement.companyName}</TableCell>
                                    <TableCell align="center">{agreement.companyNit}</TableCell>
                                    <TableCell align="center">{agreement.type}</TableCell>
                                    <TableCell align="center">{agreement.secop}</TableCell>
                                    <TableCell align="center">{agreement.extension}</TableCell>
                                    <TableCell align="center">{agreement.startDate.substring(0, agreement.startDate.indexOf("T"))}</TableCell>
                                    <TableCell align="center">{agreement.endDate.substring(0, agreement.endDate.indexOf("T"))}</TableCell>
                                    <TableCell align="center">
                                      <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                          <IconButton onClick={() => {handledEdit(agreement.id)}}  aria-label="delete" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                                          <IconButton onClick={() => {handledRemove(agreement.id)}} aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>                        
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

export default AgreementScreen;

