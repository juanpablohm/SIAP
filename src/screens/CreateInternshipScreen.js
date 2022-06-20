import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert, AlertTitle} from "@mui/material";
import { Link, useNavigate} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InternshipForm from '../components/InternshipForm';
import {  Supervisor } from '../models/supervisor';
import { Reports } from '../models/report';
import { Products } from '../models/product';
import {  Payment} from '../models/payment';
import { Internship} from '../models/internship';
import { useLocation } from "react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { createInternship } from '../api/internship/InternshipServices';
import { createSupervisor } from '../api/supervisor/SupervisorServices';

const  CreateInternshipScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    
   

    const InternshipFormModel = {
        "supervisor": Supervisor,
        "internship" : Internship,
        "payment": Payment,
        "reports": Reports,
        "products": Products,
    }

    const handleOk = (tipo) => {
        navigate('/practicas');
    };

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));
           
            let specificGoals = "";     
         
            dataSend.internship.specificGoals.map((obj) => (specificGoals += obj.description + ";" ));
           
            dataSend.internship.specificGoals = specificGoals;
           
            dataSend.reports.map((obj) => (delete obj['id']));
            dataSend.products.map((obj) => (delete obj['id']));
            dataSend.payment.fees.map((obj) => (delete obj['id']));

            let supervisor = dataSend.supervisor;
            delete dataSend['supervisor'];

            let newInternship = dataSend.internship;
            delete dataSend['internship'];

            newInternship = { ...dataSend, ...newInternship }; 

            console.log(newInternship);

            let responseSupervisor = await createSupervisor(supervisor);  

            if(responseSupervisor != null){
                newInternship.supervisorId = responseSupervisor.id;
                let responseInternship = await createInternship(newInternship); 
                setOpenConfirm(true);
            }  
        }catch(e){
            console.log(e);
            setError(true);
            setOpenConfirm(true);  
        }    
    }

    const getDialogConfirmation = (error) => {

        let texto = "Se ha creado la practica exitosamente!";
        let tipo = "success"

        if(error){
            texto = "Ha ocurrido un error, intentelo más tarde!";
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

    return (
            <Grid container maxWidth="lg" sx={{mt:5, mb:5, mx:"auto"}}>
                <Grid item xs={12} md={12} lg={12} sx={{ml:3}}>
                        <Link to={"/practicas/convenio/" + location.state.idStudent.toString()} style={{ textDecoration: 'none'}}>
                        <IconButton aria-label="delete" >
                                <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        </Link>
                </Grid>

        
                <InternshipForm InternshipFormModel={InternshipFormModel} studentId={location.state.idStudent.toString()} agreementId={location.state.agreement.id.toString()} onSumitFunc={handledSumit} labelBtn={"Crear"} />
              
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

export default CreateInternshipScreen;