import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/material';


export default function SelectTextFields({name, label, value, options, helper, onChange}) {

  return (
    <Box lg={12}
    component="form"
    
    noValidate
    autoComplete="off"
    >
        <Stack >
            <TextField
            select
            name = {name}
            label={label}
            value={value}
            defaultValue = ''
            onChange={onChange}
            helperText={helper}
            >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
        
      </Stack>
      </Box>
  );
}