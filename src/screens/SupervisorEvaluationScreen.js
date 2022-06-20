import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert, Typography, CircularProgress} from "@mui/material";
import { Link, useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { SupervisorEvaluation } from '../models/supervisorEvaluation';
import { getInternshipById } from '../api/internship/InternshipServices';

import { Supervisor } from '../models/supervisor';
import SupervisorEvaluationForm from '../components/SupervisorEvaluationForm';
import { createEvaluationSupervisor, getQuestionsSupervisor, updateEvaluationSupervisor } from '../api/Evaluation/EvaluationSupervisorServices';

const  SupervisorEvaluationScreen=(props) =>{

    let navigate = useNavigate();
    let [internship, setInternship] = useState(null);
    let [evaluation, setEvaluation] = useState(SupervisorEvaluation);
    let [editEvaluation, setEditEvaluation] = useState(SupervisorEvaluation);
    let [edit, setEdit] = useState(false);
    let [questions, setQuestions] = useState(null);
    const location = useLocation();
    let { id } = useParams(); 
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const getInternshipsData = async () => { 
        try {
          let internshipResponse = await getInternshipById(id);         
          if(internshipResponse.supervisorEvaluations.length > 0){
             setEdit(true);
             setEditEvaluation(internshipResponse.supervisorEvaluations[0]);
          }else{
            setEdit(false);
          }
          setInternship(internshipResponse); 
         
        }catch(e){
          setError(true);
        }
    };

  
    const getQuestions = async () => { 
        try {
          let questionsResponse = await getQuestionsSupervisor(); 

          let responsesModel = []

          questionsResponse.forEach((category) => {
            category.supervisorQuestions.forEach((question) => {
              responsesModel.push({supervisorQuestionId: question.id, grade:"0"})
            })      
          });

          evaluation.supervisorResponses = responsesModel;

          console.log(evaluation)

          setQuestions(questionsResponse);    
        }catch(e){
           setError(true);
        }
    };

    useEffect(() => {
        getInternshipsData();
        getQuestions();
    }, [])  

    const handleOk = (tipo) => {
        setOpenConfirm(false);  
    };

    const handledSumit = async (data) =>{

        const dataSend = JSON.parse(JSON.stringify(data));

        dataSend.internshipId = internship.id;

        //setOpenConfirm(true);  
        try {

            let responseEvaluation = await createEvaluationSupervisor(dataSend);  

            console.log(responseEvaluation);

            if(responseEvaluation.ok){
                setOpenConfirm(true);  
            }else{
                setError(true);
                setOpenConfirm(true);  
            }
      
        }catch(e){
            setError(true);
            setOpenConfirm(true);  
        }   
    }

    const handledEdit = async (data) =>{

      const dataSend = JSON.parse(JSON.stringify(data));

      console.log(dataSend)

      //setOpenConfirm(true);  
      try {

          let responseEvaluation = await updateEvaluationSupervisor(dataSend);  

          console.log(responseEvaluation);

          if(responseEvaluation != null){
              setOpenConfirm(true);  
          }else{
              setError(true);
              setOpenConfirm(true);  
          }
    
      }catch(e){
          setError(true);
          setOpenConfirm(true);  
      }   
    }

    const getDialogConfirmation = (error) => {

        let texto = "Se ha guardado la evaluación exitosamente!";
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
    else if(internship == null  || questions == null) {
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
            <Grid container maxWidth="lg" sx={{mt:10, mb:5, mx:"auto"}}>
                   
            <SupervisorEvaluationForm evaluationForm={edit ? editEvaluation : evaluation} questionsSupervisor={questions}   onSumitFunc={edit ? handledEdit : handledSumit} />   
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

export default SupervisorEvaluationScreen;