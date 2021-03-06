import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert, AlertTitle, CircularProgress, Typography} from "@mui/material";
import { Link, useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InternshipForm from '../components/InternshipForm';
import {  Supervisor } from '../models/supervisor';
import { Reports } from '../models/report';
import { Products } from '../models/product';
import {  Payment} from '../models/payment';
import { Internship} from '../models/internship';
import { useLocation } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import CompanyForm from '../components/CompanyForm';
import { getCompanyById, updateCompany } from '../api/company/CompanyServices';

const EditCompanyScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    const [company, setCompany] = useState();
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    let { id } = useParams(); 

    const handleOk = (tipo) => {
        setOpenConfirm(false);
    };

    const getCompany = async () => { 
        try {
          let companyResponse = await getCompanyById(id); 
          setCompany(companyResponse);    
        }catch(e){
           setError(true);
        }
    };

    useEffect(() => {
        getCompany();
    }, []) 

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));

            console.log(dataSend);

            let responseCompany = await updateCompany(dataSend);  

            console.log(responseCompany);
            if(responseCompany != null){
                setOpenConfirm(true);
            }else{
                setError(true);
                setOpenConfirm(true);  
            } 

        }catch(e){
            console.log(e);
            setError(true);
            setOpenConfirm(true);  
        }    
    }

    const getDialogConfirmation = (error) => {

        let texto = "Se ha actualizado la entidad exitosamente!";
        let tipo = "success"

        if(error){
            texto = "Ha ocurrido un error, intentelo m??s tarde!";
            tipo  = "error";
        }

        return (
                    <Alert severity={tipo} 
                        action={ 
                            <Button onClick={(e) => handleOk(tipo)} color="inherit" size="small"> Aceptar </Button>
                            }>                                        
                        {texto}
                    </Alert>
        );
    }

    if(error){
        return ( 
          <Grid item sx={{mt:20, mx:"auto"}} xs={10} md={4} lg={4}> 
                 <Typography 
                    align="center"
                    sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}>
                      <Alert variant="filled" severity="error">Ocurrio un error, por favor intentelo m??s tarde!</Alert>
                 </Typography>                
          </Grid>
        );
    }
    else if(company == null ) {
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
                <Grid item xs={12} md={12} lg={12} sx={{ml:3}}>
                        <Link to={"/convenios"} style={{ textDecoration: 'none'}}>
                        <IconButton aria-label="delete" >
                                <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        </Link>
                </Grid>

                <CompanyForm CompanyFormModel={company} onSumitFunc={handledSumit} onEdit={true} />
                
                <Dialog
                    sx={{m:0, '& .MuiDialog-paper': { width: '80%' } }}
                    maxWidth="xs"
                    keepMounted
                    open={openConfirm}>
                    <DialogContent>
                        {error ? (
                                getDialogConfirmation(true)
                        ) : (
                                getDialogConfirmation(false)
                        )} 
                    </DialogContent>              
                </Dialog>               
            </Grid>             
    );
}

export default EditCompanyScreen;