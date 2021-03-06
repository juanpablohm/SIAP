import React, {useEffect, useState} from 'react';
import { Grid, IconButton, Button, Alert} from "@mui/material";
import { Link, useNavigate, useParams} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import AgreementForm  from '../components/AgreementForm';
import { Agreement } from '../models/agreement';
import { createAgreement } from '../api/agreement/AgreementService';


const CreateAgreementScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    let { id } = useParams(); 
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    
    const handleOk = (tipo) => {
        navigate('/convenios');
    };

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));

            dataSend.CompanyId = id;

            if(dataSend.term != "Fija"){
                dataSend.extension = dataSend.term;
            }

            console.log(dataSend);

            let responseAgreement = await createAgreement(dataSend);  

            if(responseAgreement.ok){
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

        let texto = "Se ha creado el convenio exitosamente!";
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
                        <Link to={"/convenios"} style={{ textDecoration: 'none'}}>
                        <IconButton aria-label="delete" >
                                <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        </Link>
                </Grid>

                <AgreementForm AgreementFormModel={Agreement} onSumitFunc={handledSumit} />
                
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

export default CreateAgreementScreen;