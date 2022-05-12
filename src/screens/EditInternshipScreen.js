import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Button, ButtonGroup, Badge, Alert, CircularProgress, Typography} from "@mui/material";
import { Link, useParams} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InternshipForm from '../components/InternshipForm';
import SetStateDialog from '../components/SetStateDialog';
import { Student } from '../models/student';
import {  Supervisor } from '../models/supervisor';
import { Reports } from '../models/report';
import { Products } from '../models/product';
import { Files} from '../models/file';
import {  Payment} from '../models/payment';
import { Internship} from '../models/internship';
import { Company } from '../models/company';
import RateReviewIcon from '@mui/icons-material/RateReview';

import { getInternshipById } from '../api/internship/InternshipServices';

const InternshipFormModel = {
    "student": Student,
    "supervisor": Supervisor,
    "internship" : Internship,
    "payment":Payment,
    "reports": Reports,
    "products": Products,
    "files": Files,
    "agreement" : Company  
}


const  EditInternshipScreen=(props) =>{

    let [internship, setInternship] = useState(null);
    let { id } = useParams(); 
    let [error, setError] = useState(false);

    const getInternshipsData = async () => { 
      try {
        let internshipResponse = await getInternshipById(id); 
        console.log(internshipResponse);
        setInternship(internshipResponse);    
      }catch(e){
        setError(true);
      }
    };

    useEffect(() => {
      getInternshipsData();
    }, [])
    
  
    const handledSumit = (data) =>{

        let generalGoal = "";
        let specificGoal = "";
        data.internship.generalGoal.map((obj) => (generalGoal += obj.desc + ";" ));
        data.internship.specificGoal.map((obj) => (specificGoal += obj.desc + ";" ));

        data.internship.generalGoal = generalGoal;
        data.internship.specificGoal = specificGoal;
/* 
        data.internship.agreementId = data.agreement.id; */

        console.log(data)
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
    else if(internship == null) {
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
            <Grid container maxWidth="lg" sx={{mt:5, mb:5, mx:"auto"}}>
              <Grid item xs={12} md={12} lg={12} sx={{ml:3, position: 'absolute'}}>

                <Link to={"/practicas"} style={{ mb:5,   textDecoration: 'none'}}>
                    <IconButton aria-label="delete" >
                            <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                </Link>
           
              </Grid>

              <Grid item xs={12} md={12} lg={12} sx={{mt:10, ml:3, position: 'absolute'}}>

                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                >
                    <SetStateDialog />
                    <Link to={"/practicas"} style={{  textDecoration: 'none'}}>
                    <IconButton aria-label="delete" >                 
                            <RateReviewIcon  fontSize="large" color='primary'/>
                    </IconButton>
                    </Link>
                </ButtonGroup>
              </Grid>

              <InternshipForm InternshipFormModel={internship} onSumitFunc={handledSumit} labelBtn={"Guardar"} />

                             
            </Grid>   
            
            
    );
}

export default EditInternshipScreen;