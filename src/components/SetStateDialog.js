import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { IconButton, Tooltip } from '@mui/material';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';

const DialogSelect = ({handleSumit, type}) => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('1');

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
    handleSumit(status);
  };

  const handleClose = (event, reason) => {
      setOpen(false);   
  };

  return (
    <>
      <Tooltip title="Cambiar estado practica">
        <IconButton onClick={handleClickOpen} aria-label="delete" > <PublishedWithChangesRoundedIcon fontSize="large" color='primary' /></IconButton>
      </Tooltip>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Cambiar estado práctica</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{p:3, display: 'flex', flexWrap: 'wrap' }}>
            <FormControl fullWidth >
              <InputLabel htmlFor="demo-dialog-native">Estado</InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<OutlinedInput label="Estado" id="demo-dialog-native" />}
              >
                {type === 0 ? (
                  <>
                  <option value={1}>Aprobada Administrativo</option>
                  <option value={2}>Aprobada C. Practicas</option>
                  <option value={3}>Aprobada C. Costos</option>
                  <option value={4}>En curso</option>
                  <option value={5}>Terminada</option>
                  </>
                ) : (
                  <>
                  <option value={1}>Aprobada Docente</option>
                  <option value={2}>Aprobada C. Curriculum</option>
                  <option value={3}>Aprobada Administrativo</option>
                  <option value={4}>Aprobada C. Practicas</option>
                  <option value={5}>En curso</option>
                  <option value={6}>Terminada</option>
                  </>
                )}
              </Select>
            </FormControl>          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  variant="contained" onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogSelect;