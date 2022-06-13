import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert, AlertTitle, CircularProgress, Typography} from "@mui/material";
import { Link, useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import AgreementForm from '../components/AgreementForm';
import {  getAgreementById, updateAgreement } from '../api/agreement/AgreementService';

const EditAgreementScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    const [agreement, setAgreement] = useState();
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    let { id } = useParams(); 

    const handleOk = (tipo) => {
        navigate('/convenios');
    };

    const getAgreement = async () => { 
        try {
          let agreementResponse = await getAgreementById(id); 
          setAgreement(agreementResponse);    
        }catch(e){
           setError(true);
        }
    };

    useEffect(() => {
        getAgreement();
    }, []) 

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));

            console.log(dataSend);

            let responseAgreement = await updateAgreement(dataSend);  

            console.log(responseAgreement);
            if(responseAgreement != null){
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
    else if(agreement == null ) {
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

                <AgreementForm AgreementFormModel={agreement} onSumitFunc={handledSumit} onEdit={true}/>
                
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

export default EditAgreementScreen;