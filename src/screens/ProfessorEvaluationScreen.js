import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert, Typography, CircularProgress} from "@mui/material";
import { Link, useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { ProfessorEvaluation } from '../models/professorEvaluation';
import { getInternshipById } from '../api/internship/InternshipServices';
import ProfessorEvaluationForm from '../components/ProfessorEvaluationForm';
import { createEvaluationProfessor, getQuestionsProfessor, updateEvaluationProfessor } from '../api/Evaluation/EvaluationProfessorServices';
import { Professor } from '../models/professor';

const  ProfessorEvaluationScreen=(props) =>{

    let navigate = useNavigate();
    let [internship, setInternship] = useState(null);
    let [evaluation, setEvaluation] = useState(ProfessorEvaluation);
    let [editEvaluation, setEditEvaluation] = useState(ProfessorEvaluation);
    let [edit, setEdit] = useState(false);
    let [questions, setQuestions] = useState(null);
    const location = useLocation();
    let { id } = useParams(); 
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const getInternshipsData = async () => { 
        try {
          let internshipResponse = await getInternshipById(id);         
          if(internshipResponse.professorEvaluations.length > 0){
            setEdit(true);
            setEditEvaluation(internshipResponse.professorEvaluations[0]);
          }else{
            setEdit(false);
          }

          //console.log(editEvaluation)
          setInternship(internshipResponse); 
         
        }catch(e){
          setError(true);
        }
    };

    

    const getQuestions = async () => { 
        try {
          let questionsResponse = await getQuestionsProfessor(); 
          //console.log(questionsResponse);

          let responsesModel = []

          questionsResponse.forEach((question) => {
            responsesModel.push({professorQuestionId: question.id, grade:"0"})
          });

          evaluation.professorResponses = responsesModel;

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

        console.log(dataSend);

        dataSend.internshipId = internship.id;

        //setOpenConfirm(true);  
        try {

            let responseEvaluation = await createEvaluationProfessor(dataSend);  

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

            let responseEvaluation = await updateEvaluationProfessor(dataSend);  

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

        let texto = "Se ha guardado la evaluaci??n exitosamente!";
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
            <Grid container maxWidth="lg" sx={{mt:5, mb:5, mx:"auto"}}>
            <Grid item xs={12} md={12} lg={6} sx={{ml:3, position: 'absolute'}}>

            <Link to={"/practicas"} style={{ mb:5,   textDecoration: 'none'}}>
                <IconButton aria-label="delete" >
                        <ChevronLeftIcon fontSize="large" />
                </IconButton>
            </Link>

            </Grid>   
    
            <ProfessorEvaluationForm evaluationForm={ edit ? editEvaluation : evaluation } questionsProfessor={questions}   onSumitFunc={edit ? handledEdit : handledSumit} />   
           
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