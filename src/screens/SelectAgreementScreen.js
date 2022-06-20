import React, {useState, useEffect} from "react"
import { Alert, Button, CircularProgress, IconButton, tooltipClasses } from "@mui/material";
import { Grid} from "@mui/material";
import { Link, useLocation, useParams} from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { getAgreements } from "../api/agreement/AgreementService";

const top100Films = [
    { label: 'Universidad de Caldas', id: 12345},
    { label: 'Check', id: 12346},
];

const SelectAgreementScreen = () => {

    const [agreements, setAgreements] = useState(null);
    const [agreement, setAgreement] = useState(null);
    const [error, setError] = useState(false);
    const location = useLocation();
    let { id } = useParams(); 

    const getAgreementsData = async () => { 
      try {
        let agreementsResponse = await getAgreements(); 
        setAgreements(agreementsResponse);   
      }catch(e){
        setError(true);
      }
    };
  
    useEffect(() => {
       getAgreementsData();
    }, []) 

    const handleChange = (event, value)=>{
       setAgreement(value);
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
    } else if(agreements == null) {
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

        <Grid container  maxWidth="md" sx={{mt:5, mx:"auto"}}>

          <Grid item xs={12} md={12} lg={12} sx={{ml:3}}>
                    <Link to={"/practicas"} style={{ textDecoration: 'none'}}>
                    <IconButton aria-label="delete" >
                            <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                    </Link>
          </Grid>

          <Grid item xs={2} md={2} lg={2}  ></Grid>

          <Grid item xs={8} md={8} lg={8} sx={{ mt:5, mx:"auto"}}>
              <Card elevation={15} >
                 
                  <CardContent>
                    <Autocomplete                   
                        disablePortal
                        value={agreement}
                        getOptionLabel={(option) => option.registeredNumber + " / " +  option.companyName + " / " + option.companyNit}
                        onChange={handleChange}     
                        id="controllable-states-demo"
                        options={agreements}  
                        renderInput={(params) => <TextField {...params} label="Empresa" />}
                        noOptionsText = {"No se encuentra la empresa, por favor asegurese de que el convenio existe "}
                    />
                  </CardContent>
              </Card>
          </Grid>

          <Grid item xs={2} md={2} lg={2}></Grid>

          <Grid item xs={6} md={6} lg={4} sx={{mt:2 , p:3, mx:"auto"}}>
                  <Link  style={{ textDecoration: 'none'}} to={ agreement == null ? "": "/practicas/nueva"} state={{ agreement: agreement, idStudent: id}}>
                    <Button variant="contained" disabled={ agreement == null ? true: false } color='primary' size='large' fullWidth>Continuar</Button>
                  </Link>    
          </Grid> 
        </Grid>
    );

}

export default SelectAgreementScreen;

