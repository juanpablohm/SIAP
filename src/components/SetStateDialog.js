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
import { IconButton } from '@mui/material';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="delete" > <PublishedWithChangesRoundedIcon fontSize="large" color='primary' /></IconButton>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Cambiar estado practica</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{p:1, display: 'flex', flexWrap: 'wrap' }}>
            <FormControl fullWidth >
              <InputLabel htmlFor="demo-dialog-native">Estado</InputLabel>
              <Select
                native
                value={age}
                onChange={handleChange}
                input={<OutlinedInput label="Estado" id="demo-dialog-native" />}
              >
                <option value={10}>Aprobada</option>
                <option value={20}>Rechazada</option>
                <option value={30}>Incompleta</option>
              </Select>
            </FormControl>          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  variant="contained" onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}