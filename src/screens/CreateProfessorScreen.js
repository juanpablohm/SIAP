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
import AgreementForm  from '../components/AgreementForm';
import { Agreement } from '../models/agreement';
import { Company } from '../models/company';
import { Student } from '../models/student';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../api/student/StudentService';
import { Professor } from '../models/professor';
import ProfessorForm from '../components/ProfessorForm';
import { createProfessor } from '../api/professor/ProfessorServices';

const CreateProfessorScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    const [professor, setProfessor] = useState(Professor);
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOk = (tipo) => {
        navigate('/docentes');
    };

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));

            console.log(dataSend);

           let responseStudent = await createProfessor(dataSend);  

            if(responseStudent.ok){
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

        let texto = "Se ha creado el docente exitosamente!";
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
                        <Link to={"/docentes"} style={{ textDecoration: 'none'}}>
                        <IconButton aria-label="delete" >
                                <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        </Link>
                </Grid>

                <ProfessorForm ProfessorFormModel={professor} onSumitFunc={handledSumit} />
                
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

export default CreateProfessorScreen;