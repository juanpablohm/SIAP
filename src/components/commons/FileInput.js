import React ,  { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { TextField, Grid, Link, Box } from '@mui/material';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { getDisplayName } from '@mui/utils';

const Input = styled('input')({
  display: 'none',
});

const ariaLabel = { 'aria-label': 'description' };

export default function UploadButton({label, file, onChange, id}) {

  const [name, setName] = useState('Seleccione un archivo');

  const getName = ()=>{
    if(file === null){
      return "Seleccione un archivo";
    }else{
      return file.name;
    }
  }

  return (
    <Grid container spacing={2}>
           
        <Grid item xs={8} md={9} lg={9}>
          <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <FilePresentRoundedIcon fontSize='large'   sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField           
              size="small"  
              variant="standard" 
              fullWidth
              value={getName()}

              />
          </Box>
        </Grid> 


        <Grid item xs={4} md={3} lg={3}>
          <label htmlFor={id}>
              <Input 
                  accept="image/*" 
                  id={id}
                  multiple type="file"
                  onChange={onChange}
                  />
              <Button 
                  startIcon={<FileUploadRoundedIcon  />}
                  variant="contained" 
                  component="span"
                  fullWidth>
                  {label}
              </Button>           
          </label>
        </Grid>
    </Grid>
  );
}