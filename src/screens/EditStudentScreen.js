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
import { createStudent, getStudentById, updateStudent } from '../api/student/StudentService';

const EditStudentScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    const [student, setStudent] = useState();
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    let { id } = useParams(); 

    const handleOk = (tipo) => {
        setOpenConfirm(false);
    };

    const getStudent = async () => { 
        try {
          let studentResponse = await getStudentById(id); 
          setStudent(studentResponse);    
        }catch(e){
           setError(true);
        }
    };

    useEffect(() => {
        getStudent();
    }, []) 

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));

            console.log(dataSend);

            if(dataSend.universityId != 2){
                dataSend.type = "1";
            }else{
                dataSend.type = "0";
            }

            let responseStudent = await updateStudent(dataSend);  

            if(responseStudent != null){
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

        let texto = "Se ha actualizado el practicante exitosamente!";
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
    else if(student == null ) {
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
                        <Link to={"/practicantes"} style={{ textDecoration: 'none'}}>
                        <IconButton aria-label="delete" >
                                <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        </Link>
                </Grid>

                <StudentForm StudentFormModel={student} onSumitFunc={handledSumit} />
                
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

export default EditStudentScreen;