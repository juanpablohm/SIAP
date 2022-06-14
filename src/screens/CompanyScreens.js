import React, { useEffect, useState } from "react"
import { Alert, Button, ButtonGroup, CircularProgress, Collapse, IconButton, Tooltip } from "@mui/material";
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
import { deleteCompanyById, getCompanys } from "../api/company/CompanyServices";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { deleteAgreementById } from "../api/agreement/AgreementService";

const getIconState = (status, startDate, endDate) =>{

  let state = { label:"Creado" , color:'default'}

  let actual = new Date();

  if(startDate <= new Date() && endDate >= actual){
    state = { label:"Vigente" , color:'success'}
  }else if (endDate < actual){
    state = { label:"Vencido" , color:'warning'}
  }
  
  return(<Chip sx={{width:'100%'}}  label={state.label} color={state.color}/>)
}

function Row(props) {

    const {company, handledEdit, handledRemove, handledNew, handledRemoveAgreement, handledEditAgreement} = props;
    const [open, setOpen] = React.useState(false);
   
    const noAgreements = ()=>{
        return(
        <Typography 
           align="center"
           sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1rem'}}>
            No se ha encontrado ningun convenio
        </Typography>)
    }

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align="center">{company.name}</TableCell>
            <TableCell align="center">{company.nit}</TableCell>
            <TableCell align="center">{company.address}</TableCell>
            <TableCell align="center">{company.phone}</TableCell>
            <TableCell align="center">{company.contactName}</TableCell>
            <TableCell align="center">
              <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                <Tooltip title="Agregar convenio">
                  <IconButton onClick={() => {handledNew(company.id)}}  aria-label="new" size="small" color="default"> <AddCircleIcon /> </IconButton>
                </Tooltip> 
                <Tooltip title="Editar entidad">
                  <IconButton onClick={() => {handledEdit(company.id)}}  aria-label="edit" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                </Tooltip> 
                <Tooltip title="Eliminar entidad"> 
                  <IconButton onClick={() => {handledRemove(company.id)}} aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>   
                </Tooltip>                     
              </ButtonGroup>
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>

                {company.agreements.length < 1 ? ( 
                        noAgreements()
                ) : (              
                    <Table size="small" aria-label="purchases">
                      <TableHead >
                          <TableRow>
                            <TableCell  align="center">Estado</TableCell>
                            <TableCell  align="center">Tipo</TableCell>
                            <TableCell align="center">SECOP</TableCell>
                            <TableCell  align="center">Prorroga</TableCell>
                            <TableCell  align="center">Fecha Inicio</TableCell>
                            <TableCell  align="center">Fecha Fin</TableCell>
                            <TableCell align="center"></TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {company.agreements.map((agreement) => (
                          <TableRow key={agreement.id}>
                                <TableCell align="center" component="th" scope="row">
                                        {getIconState(agreement.status, new Date(agreement.startDate), new Date(agreement.endDate))}
                                </TableCell>
                                <TableCell align="center">{agreement.type}</TableCell>
                                <TableCell align="center">{agreement.secop}</TableCell>
                                <TableCell align="center">{agreement.extension}</TableCell>
                                <TableCell align="center">{agreement.startDate.substring(0, agreement.startDate.indexOf("T"))}</TableCell>
                                <TableCell align="center">{agreement.endDate.substring(0, agreement.endDate.indexOf("T"))}</TableCell>
                                <TableCell align="center">
                                  <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                      <IconButton onClick={() => {handledEditAgreement(agreement.id)}}  aria-label="delete" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                                      <IconButton onClick={() => {handledRemoveAgreement(agreement.id)}} aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>                        
                                  </ButtonGroup>
                                </TableCell>
                          </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow> 
      </React.Fragment>
    );
  }

const CompanyScreen = () => {

    const [companys, setCompanys] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState(companys);

    let navigate = useNavigate();
  

    const getCompanysData = async () => { 
      try {
        let companyResponse = await getCompanys(); 

        console.log(companyResponse);
        setCompanys(companyResponse);   
        setSearch(companyResponse);
      }catch(e){
        setError(true);
      }
    };

    useEffect(() => {
        getCompanysData();
    }, []);

    const handleSearch = (value) => {
      
      const lowercasedValue = value.toLowerCase().trim();

      console.log(search);

      if(lowercasedValue === '') setCompanys(search);
      else {
        const filteredData = companys.filter((item) => {
            return Object.keys(item).some((key) => 
                  item[key]?.toString().toLowerCase().trim().includes(lowercasedValue)
            );
        });
        if(filteredData.length >= 1)
            setCompanys(filteredData);
      }
    };

    const handledEdit = (id) => {
      navigate('/entidad/editar/' + id);
    }

    const handledNew = (id) => {
      navigate('/convenios/nuevo/' + id);
    }

    const handledRemove = async (id) => {
      console.log("borrar" + id);
      try {
        let companyResponse = await deleteCompanyById(id); 

        if(companyResponse != null){
          getCompanysData();
        }else{
          setError(true);
        }
        
      }catch(e){
        setError(true);
      } 
    }

    const handledEditAgreement = (id) => {
      navigate('/convenios/editar/' + id);
    }

    const handledRemoveAgreement = async (id) => {
      console.log("borrar" + id);
      try {
        let agreementResponse = await deleteAgreementById(id); 
        if(agreementResponse != null){
          getCompanysData();
        }else{
          setError(true);
        }        
      }catch(e){
        setError(true);
      } 
    }

    const noCompanys = ()=>{
        return(
        <Typography 
           align="center"
           sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
            No se ha encontrado ninguna compañia
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
    else if(companys == null) {
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
                              placeholder="Buscar por empresa, nit, responsable "
                              onChange={(event) => handleSearch(event.target.value)}
                              searchBarWidth='300px'
                          />
                        </Grid>
                        <Grid item xs={4} lg={3} md={3}>
                          <Link  style={{ textDecoration: 'none'}} to={"/entidad/nueva"} >
                            <Button startIcon={<AddRoundedIcon  />} variant="contained" color='primary' size='medium' fullWidth>Nueva entidad</Button>
                          </Link> 
                        </Grid> 
                  </Grid>               
                  <CardContent>
            
                  {companys.length < 1 ? ( 
                        noCompanys()
                  ) : (
                    <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                            <TableHead  sx={{backgroundColor:'#212121', color:'white'}}>
                                <TableRow>
                                <TableCell />
                                <TableCell  sx={{color:'white'}} align="center" >Nombre</TableCell>
                                <TableCell  sx={{color:'white'}} align="center">NIT</TableCell>
                                <TableCell  sx={{color:'white'}} align="center">Dirección</TableCell>
                                <TableCell  sx={{color:'white'}} align="center">Telefono</TableCell>
                                <TableCell  sx={{color:'white'}} align="center">Responsable</TableCell>
                                <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companys.map((company) => (
                                    <Row key={company.id} handledEditAgreement={handledEditAgreement} company={company} handledRemoveAgreement={handledRemoveAgreement} handledEdit={handledEdit} handledRemove={handledRemove} handledNew={handledNew} />
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

export default CompanyScreen;

{/* <TableContainer component={Paper}>
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
                            {companys.map((company) => (
                                <TableRow
                                  key={company.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                      {getIconState(company.status)}
                                    </TableCell>
                                    <TableCell align="center">{company.companyName}</TableCell>
                                    <TableCell align="center">{company.companyNit}</TableCell>
                                    <TableCell align="center">{company.type}</TableCell>
                                    <TableCell align="center">{company.secop}</TableCell>
                                    <TableCell align="center">{company.extension}</TableCell>
                                    <TableCell align="center">{company.startDate.substring(0, company.startDate.indexOf("T"))}</TableCell>
                                    <TableCell align="center">{company.endDate.substring(0, company.endDate.indexOf("T"))}</TableCell>
                                    <TableCell align="center">
                                      <ButtonGroup disableElevation variant="contained" aria-label="outlined primary button group">
                                          <IconButton onClick={() => {handledEdit(company.id)}}  aria-label="delete" size="small" color="default"> <EditRoundedIcon /> </IconButton>
                                          <IconButton onClick={() => {handledRemove(company.id)}} aria-label="delete"  size="small" color="default"> <DeleteIcon /> </IconButton>                        
                                      </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))} 
                          </TableBody>
                        </Table>
                    </TableContainer> */}

