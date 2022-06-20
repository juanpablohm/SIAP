import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Button, ButtonGroup, Badge, Alert, CircularProgress, Typography, MenuItem, Select, Chip, Accordion, AccordionSummary, AccordionDetails, Tooltip} from "@mui/material";
import { Link, useParams, useNavigate} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InternshipForm from '../components/InternshipForm';
import DialogSelect from '../components/SetStateDialog';
import { Student } from '../models/student';
import {  Supervisor } from '../models/supervisor';
import { Reports } from '../models/report';
import { Products } from '../models/product';
import { Files} from '../models/file';
import {  Payment} from '../models/payment';
import { Internship} from '../models/internship';
import { Company } from '../models/company';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import {v4 as uuidv4} from "uuid";

import { getSupervisorById, updateSupervisor } from '../api/supervisor/SupervisorServices';
import { getInternshipById, updateInternshipStatus, updateInternship } from '../api/internship/InternshipServices';
import LinkSupervisorGenerator from '../components/LinkSupervisorGenerator';

const  EditInternshipScreen = (props) =>{

    let [internship, setInternship] = useState(null);
    let [supervisor, setSupervisor] = useState(null);
    let { id } = useParams(); 
    let [error, setError] = useState(false);
    let navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false);

    let InternshipFormModel = {
      "supervisor": null,
      "internship" : null,
      "payment": null,
      "reports": null,
      "products": null,
    }
    

    const getInternshipsData = async () => { 
      try {
        let internshipResponse = await getInternshipById(id);
        
        getSupervisorData(internshipResponse.supervisorId);

        let listGoal = [];
       
        let specificGoals = internshipResponse.specificGoals.split(";");    
                
        specificGoals.forEach((goal) => { 
          if(goal != '')
            listGoal.push({ description  : goal , id: uuidv4() }) 
        })
          
        internshipResponse.specificGoals = listGoal;

        InternshipFormModel.payment = internshipResponse.payment;

        if(internshipResponse.payment.fees.length <= 0)
          InternshipFormModel.payment.fees = Payment.fees;

        if(internshipResponse.reports.length >= 1)
          InternshipFormModel.reports = internshipResponse.reports;

        if(internshipResponse.products.length >= 1)
          InternshipFormModel.products = internshipResponse.products;
       
        delete  internshipResponse['payment'];
        delete  internshipResponse['reports'];
        delete  internshipResponse['products'];

        InternshipFormModel.internship = internshipResponse;

        console.log(InternshipFormModel)
        
        setInternship(InternshipFormModel);    
      }catch(e){
        setError(true);
      }
    };

    const getSupervisorData = async (idSupervisor) => { 
      try {
        let supervisorResponse = await getSupervisorById(idSupervisor);
        InternshipFormModel.supervisor = supervisorResponse;
        setSupervisor(supervisorResponse);    
      }catch(e){
        setError(true);
      }
    };

    useEffect(() => {
      getInternshipsData();
    }, []) 
    
    const handleChangeStatus = async (status) => {
        console.log("Paso al estado" + status);
        try {
          let updateStatusResponse = await updateInternshipStatus(id, status);
        }catch(e){
           console.log(e);
        }
    };
  
    const handledSumit = async (data) =>{

      try {
        const dataSend = JSON.parse(JSON.stringify(data));

        //console.log(dataSend);

        let specificGoals = "";     
    
        dataSend.internship.specificGoals.map((obj) => (specificGoals += obj.description + ";" ));
        dataSend.internship.specificGoals = specificGoals;
       
        dataSend.reports.map((obj) => ( typeof obj.id !== 'number' ? obj['id'] = 0 : null ));
        dataSend.products.map((obj) => (typeof obj.id !== 'number' ? obj['id'] = 0 : null));
        dataSend.payment.fees.map((obj) => (typeof obj.id !== 'number' ? obj['id']=0: null));

        let supervisor = dataSend.supervisor;
        delete dataSend['supervisor'];

        let newInternship = dataSend.internship;
        delete dataSend['internship'];

        newInternship = { ...dataSend, ...newInternship }; 

        console.log("Esto eslo que envia")
        console.log(JSON.stringify(newInternship, null, 2));

        let responseSupervisor = await updateSupervisor(supervisor);  

        if(responseSupervisor != null){ 
          newInternship.supervisorId = responseSupervisor.id; 
          let responseInternship = await updateInternship(newInternship);   
          setOpenConfirm(true);
        }  
      }catch(e){
          console.log(e);
          setError(true);
          setOpenConfirm(true);  
      }    
    }

    const handleOk = (tipo) => {
      setOpenConfirm(false);
    };

    const getDialogConfirmation = (error) => {

      let texto = "Se ha actualizado la practica exitosamente!";
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
    else if(internship == null || supervisor == null) {
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
          
              <Grid item xs={12} md={12} lg={12} sx={{mt:10, ml:3, position: 'absolute'}}>

                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                >
                    
                    <DialogSelect handleSumit={handleChangeStatus} type={internship.internship.type} /> 
                

                    <Tooltip title="Comentar practica">
                      <IconButton aria-label="delete" > <RateReviewIcon  fontSize="large" color='primary'/> </IconButton>
                    </Tooltip>

                    <Tooltip title="Descargar solicitud de practica">
                      <a target="_blank" href={"https://steelheart.tk/pdf-generator/index.php?key=SIAP&doc=practica&id=" + id}>
                        <IconButton aria-label="delete" > <DownloadForOfflineRoundedIcon  fontSize="large" color='primary'/> </IconButton>
                      </a>
                    </Tooltip>

                    <LinkSupervisorGenerator idLink={id}></LinkSupervisorGenerator>

                </ButtonGroup>
              </Grid>
 
              <InternshipForm InternshipFormModel={internship} 
                             studentId={internship.internship.studentId} 
                             agreementId={internship.internship.agreementId} 
                             onSumitFunc={handledSumit} 
                             labelBtn={"Guardar"} 
                             additionalComponents={true} 
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

export default EditInternshipScreen;