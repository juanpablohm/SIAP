import React from 'react';
import { Grid, IconButton, Button} from "@mui/material";
import { Link} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InternshipForm from '../components/InternshipForm';
import { Student } from '../models/student';
import {  Officer } from '../models/officer';
import { Reports } from '../models/report';
import { Products } from '../models/product';
import { Files} from '../models/file';
import {  Payment} from '../models/payment';
import { Internship} from '../models/internship';
import {  Professor } from '../models/professor';
import { Company } from '../models/company';

const  CreateInternshipScreen=() =>{

    const InternshipFormModel = {
        "student": Student,
        "officer": Officer,
        "internship" : Internship,
        "payment":Payment,
        "report": Reports,
        "products": Products,
        "files": Files,
        "professor": Professor,
        "company": Company
    }
              

    const handledSumit = (data) =>{
        console.log(data)
    }

    return (
            <Grid container maxWidth="lg" sx={{mt:5, mb:5, mx:"auto"}}>

              <Grid item xs={12} md={12} lg={12} sx={{ml:3}}>
                    <Link to={"/practicas"} style={{ textDecoration: 'none'}}>
                    <IconButton aria-label="delete" >
                            <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                    </Link>
              </Grid>

              <InternshipForm InternshipFormModel={InternshipFormModel} onSumitFunc={handledSumit} labelBtn={"Crear"} />
                 
            </Grid>   
            
            
    );
}

export default CreateInternshipScreen;