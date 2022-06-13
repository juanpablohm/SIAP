import React, { useState} from 'react';
import { Grid, IconButton, Button, Alert} from "@mui/material";
import { Link, useNavigate} from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation } from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import CompanyForm  from '../components/CompanyForm';
import { Company } from '../models/company';
import { createCompany } from '../api/company/CompanyServices';


const CreateCompanyScreen=(props) =>{

    let navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    
    const handleOk = (tipo) => {
        navigate('/convenios');
    };

    const handledSumit = async (data) =>{
 
       try {
            const dataSend = JSON.parse(JSON.stringify(data));

            console.log(dataSend);

            let responseCompany = await createCompany(dataSend);  

            if(responseCompany.ok){
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

        let texto = "Se ha creado la entidad exitosamente!";
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

                <CompanyForm CompanyFormModel={Company} onSumitFunc={handledSumit} onEdit={false} />
                
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

export default CreateCompanyScreen;