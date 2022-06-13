import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert, AlertTitle, ButtonGroup, Typography, CircularProgress} from "@mui/material";
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
import MinutaForm from '../components/MinutaForm';
import SetStateDialog from '../components/SetStateDialog';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import { Minuta } from '../models/minuta';
import { getInternshipById } from '../api/internship/InternshipServices';
import { getStudentById } from '../api/student/StudentService';
import { getMinutaById, updateMinuta } from '../api/minuta/MinutaServices';
import {v4 as uuidv4} from "uuid";
import ProfessorEvaluationForm from '../components/ProfessorEvaluationForm';

const  ProfessorEvaluationScreen=(props) =>{

    let [minuta, setMinuta] = useState(Minuta);
    let navigate = useNavigate();
    let [internship, setInternship] = useState(null);
    let [student, setStudent] = useState(null);
    const location = useLocation();
    let { id } = useParams(); 
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const getInternshipsData = async () => { 
        try {
          let internshipResponse = await getInternshipById(id);         
          //console.log(internshipResponse);
          setInternship(internshipResponse); 
          getMinuta(internshipResponse.minutaId);
          getStudent(internshipResponse.studentId);   
        }catch(e){
          setError(true);
        }
    };

    const getStudent = async (studentId) => { 
        try {
          let studentResponse = await getStudentById(studentId); 
          //console.log(studentResponse);
          setStudent(studentResponse);    
        }catch(e){
           setError(true);
        }
    };

    const getMinuta = async (minutaId) => { 
        try {
          let minutaResponse = await getMinutaById(minutaId); 
          
          let listNotes = [];
          let notes = minutaResponse[0].observations.split(";");
          
          notes.forEach((note) => {
            if(note != '')
             listNotes.push({ description  : note , id: uuidv4() }) 
          });

          if(listNotes.length === 0){
            listNotes.push({ description  : "  " , id: uuidv4() }) 
          }
             
          minutaResponse[0].observations = listNotes;

          console.log(minutaResponse);

          setMinuta(minutaResponse[0]);    
        }catch(e){
           setError(true);
        }
    };
  
    useEffect(() => {
        getInternshipsData();
    }, []) 

    const handleOk = (tipo) => {
        navigate('/practicas');
    };

    const handledSumit = async (data) =>{

        const dataSend = JSON.parse(JSON.stringify(data));

        console.log(dataSend);

        let notes = "";
     
        dataSend.observations.map((obj) => (notes += obj.description + ";" ));   
        dataSend.observations = notes;

        console.log(dataSend); 
        //setOpenConfirm(true);  
        try {
            let responseMinuta = await updateMinuta(dataSend); 
            console.log(responseMinuta);
            setOpenConfirm(true);  
        }catch(e){
            setError(true);
            setOpenConfirm(true);  
        }   
    }

    const getDialogConfirmation = (error) => {

        let texto = "Se ha guardado la minuta exitosamente!";
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
    else if(internship == null || student == null || minuta == null) {
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
            <Grid item xs={12} md={12} lg={6} sx={{ml:3, position: 'absolute'}}>

            <Link to={"/practicas"} style={{ mb:5,   textDecoration: 'none'}}>
                <IconButton aria-label="delete" >
                        <ChevronLeftIcon fontSize="large" />
                </IconButton>
            </Link>

            </Grid>
        
         

            <ProfessorEvaluationForm  onSumitFunc={handledSumit} 
            />   
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

export default ProfessorEvaluationScreen;