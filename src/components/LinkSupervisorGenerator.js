import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, Grid, IconButton, Tooltip } from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';


const LinkSupervisorGenerator = ({idLink}) => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('2');

  const handleChange = (event) => {
    setStatus(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
    
  };

  const handleClose = (event, reason) => {
      setOpen(false);   
  };

  return (
    <>
      
      <Tooltip title="Evaluación supervisor practica">
            <IconButton onClick={handleClickOpen} aria-label="delete" > <LinkRoundedIcon fontSize="large" color='primary'/> </IconButton>
      </Tooltip>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Enlace evaluación supervisor</DialogTitle>
        <DialogContent sx={{p:5}}>

            <Grid container spacing={3}>              
                <Grid item xs={12} md={12} lg={12} >
                    <DialogContentText sx={{fontSize:"0.95rem"}} id="alert-dialog-description">
                        Envia el siguiente link a tu supervisor de practica para que pueda realizar la evaluación de desempeño.
                    </DialogContentText>
                </Grid>

                <Grid item xs={12} md={12} lg={12} >                 
                        <Button onClick={(event) => {navigator.clipboard.writeText("http://localhost:3000/supervisor/evaluacion/" + idLink);}} sx={{float: 'right'}} variant="outlined" startIcon={<ContentCopyRoundedIcon />}> Copiar enlace </Button>
                </Grid>
            </Grid>
        
          
         

            
        </DialogContent>
       
      </Dialog>
    </>
  );
}

export default LinkSupervisorGenerator;